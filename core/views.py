from django.shortcuts import render, get_object_or_404
from .models import Post

def index(request):
    return render(request, 'core/index.html' )

def about(request):
    return render(request, 'core/about.html')

def blog(request):
    posts = Post.objects.order_by('-created_at')
    return render(request, 'core/blog.html', {'posts': posts})

def post_detail(request):
    posts = get_object_or_404(Post, slug=slug)
    return render(request, 'core/post_detail.html', {'post': post})
