import json
from collections import defaultdict
from datetime import datetime

from django.db.models import Count
from django.db.models.functions import TruncDay
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt

from .models import Engagement


def index(request):
    latest_interaction_list = Engagement.objects.order_by('-interaction_time')[:5]
    template = loader.get_template('kiosk/index.html')
    context = {
        'latest_interaction_list': latest_interaction_list,
    }
    return HttpResponse(template.render(context, request))


def stats(request):
    latest_interaction_list = Engagement.objects.order_by('-interaction_time')[:200]

    engagements = Engagement.objects.annotate(interaction_day=TruncDay('interaction_time')) \
        .values('interaction_day', 'product_name') \
        .annotate(c=Count('id'))

    total_interaction = Engagement.objects.count()
    products_ratio = Engagement.objects.values('product_name').annotate(y=Count('id'))
    pie_chart_data = [[product['product_name'],
                       (product['y'] / total_interaction) * 100] for product in products_ratio]

    engagements_group_product_and_day = defaultdict(dict)
    days = set()
    for engagement in engagements:
        day = str(engagement['interaction_day'].month) + '/' + str(engagement['interaction_day'].day)
        days.add(day)
        engagements_group_product_and_day[engagement['product_name']].update({day: engagement['c']})

    days = list(days)
    days.sort(key=lambda date: datetime.strptime(date, "%m/%d"))

    # build the time series data to display in charts
    series = []
    for product in engagements_group_product_and_day:
        serie = {"name": product, "data": []}
        for day in days:
            if day in engagements_group_product_and_day[product]:
                serie["data"].append(engagements_group_product_and_day[product][day])
            else:
                serie["data"].append(0)

        series.append(serie)

    pie_data = [{
        "type": 'pie',
        "name": "product popularity",
        "data": pie_chart_data
    }]

    chart_data = {"days": days,
                  "products_data": series,
                  "piechart_product_data": pie_data}

    template = loader.get_template('kiosk/stats.html')
    context = {
        'latest_interaction_list': latest_interaction_list,
        'charts_data': json.dumps(chart_data)
    }
    return HttpResponse(template.render(context, request))


def display(request):
    template = loader.get_template('kiosk/display.html')

    return HttpResponse(template.render({}, request))


@csrf_exempt
def log(request):
    engagement_data = request.POST
    engagement = Engagement(product_name=engagement_data.get("product_name"),
                            interaction_time=engagement_data.get("interaction_time"),
                            interaction_type=engagement_data.get("interaction_type"),
                            kiosk_id=engagement_data.get("kiosk_id"),
                            button_name=engagement_data.get("action"),
                            geolocation=engagement_data.get("geolocation")
                            )
    engagement.save()
    return HttpResponse()
