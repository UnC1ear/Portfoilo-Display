from django.db import models

class Work(models.Model):
    title = models.CharField(max_length=100)
    dynasty = models.CharField(max_length=20)
    cover = models.ImageField(upload_to='covers/')
    builder = models.CharField(max_length=50)
    renderer = models.CharField(max_length=50)
    description = models.TextField()
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class WorkImage(models.Model):
    work = models.ForeignKey(Work, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='works/')
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.work.title} - {self.order}"