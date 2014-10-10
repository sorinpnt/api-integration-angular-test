from django.conf.urls import patterns, include, url
from django.contrib import admin

from tastypie.api import Api

from base.api import *
from views import *


api = Api(api_name="v1.0")
api.register(CoursesResource())

urlpatterns = patterns('',

	url(r'^api/', include(api.urls)),
	url(r'^', MainPageView.as_view()),
)
