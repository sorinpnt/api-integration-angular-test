from __future__ import unicode_literals

from django.db import models

class Course(models.Model):
	title = models.CharField(max_length=50)
	created = models.TimeField()
	modified = models.TimeField()
	status = models.IntegerField()
	authorId = models.IntegerField()
	authorName = models.CharField(max_length=50)
	liveStatus = models.IntegerField()
	liveActivities = models.IntegerField()
	total_activities = models.IntegerField()
	displayOrder = models.IntegerField()