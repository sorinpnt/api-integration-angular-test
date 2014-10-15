from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.resources import ALL_WITH_RELATIONS
from base.models import *


class CoursesResource(ModelResource):
    class Meta:
        resource_name = 'courses'
        authorization = Authorization()
        queryset = Course.objects.all()
        limit = 0
        allowed_methods = ['get','post','put']
        filtering = {
	      'id': ALL_WITH_RELATIONS,
	    }