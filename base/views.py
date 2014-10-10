from django.shortcuts import render
from django.views.generic import *
from django.http import HttpResponse

from base.models import *


class MainPageView(TemplateView):
    template_name =  "base/main_page.html"