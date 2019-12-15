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
    template = loader.get_template('kiosk/stats.html')
    context = {
        'latest_interaction_list': latest_interaction_list,
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
