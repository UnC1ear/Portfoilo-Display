from django.contrib import admin
from .models import Work, WorkImage


class WorkImageInline(admin.TabularInline):
    model = WorkImage
    extra = 1


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ['title', 'dynasty', 'builder', 'created_at']
    list_filter = ['dynasty']
    search_fields = ['title', 'builder']
    inlines = [WorkImageInline]