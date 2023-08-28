from django.db import models

# Create your models here

"""
User need to signup using Name, University id, phone number and blood group
"""

class Donor(models.Model):
    name = models.CharField(max_length=50,blank=False)
    universityId = models.IntegerField(blank=False)
    phoneNumber = models.IntegerField(blank=False)
    bloodGroup = models.CharField(max_length=3,blank=False)
    def __str__(self):
        return self.name[0:50]