from django.db import models


class Engagement(models.Model):
    kiosk_id = models.IntegerField(null=True)
    product_name = models.CharField(max_length=200)
    interaction_time = models.DateTimeField('interaction time')
    interaction_type = models.CharField(max_length=200)
    button_name = models.CharField(max_length=200)
    geolocation = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.product_name
