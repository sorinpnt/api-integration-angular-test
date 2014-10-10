from django.contrib import admin

from base.models import *

class AdminTemplate(admin.ModelAdmin):
	pass

admin.site.register(Course, AdminTemplate)