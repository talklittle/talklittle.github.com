---
layout: post
category : frog-ball
tags : [frog-ball, devlog, screenshot]
tagline: Day 46
---
{% include JB/setup %}

![textured model in game](/assets/images/frog-ball/2012-12-01_texturedmodel.png)

## Creating and animating the frog in Blender

[Blender](http://www.blender.org) is **the** free 3d modeling solution.
I'm not going to attempt to recreate any of the numerous tutorials
across the web.

I used a Mirror modifier, simple box modeling (lots of Extrude),
some Subdivide to help create facial features, and that's about it
for the mesh construction.

I modified the UV export script in Blender 2.63 to export the UV map
without the wireframe overlaid. The cool thing about the UV export
script is that it exports the texture using the existing materials
as a guide for the artist, with default opacity 0.25.
By changing the opacity to 1.0, and removing the wireframe, I
was able to set color materials on my model and generate a UV texture
from those materials,
without ever having to modify the texture in GIMP.
Of course this is a simple model with solid colors per face.

Finally I rigged an Armature and did the keyframe animations.
I exported the animations as MD2 using
[the junaio script](http://www.junaio.com/develop/docs/documenation/general/3dmodels/),
modified to work on Blender 2.62+ (`mesh.faces` becomes `mesh.polygons`).
See [Blender 2.62 NGons gotchas](http://www.blender.org/documentation/blender_python_api_2_62_2/info_gotcha.html#ngons-and-tessellation-faces).

## Loading the MD2 in libgdx

[Libgdx source](https://github.com/libgdx/libgdx)
under `extensions/model-loaders` has loaders for a few formats like MD2.

I found [this thread](http://www.badlogicgames.com/forum/viewtopic.php?p=9990)
which explains that MD2 is currently the best bet for animated models in libgdx,
and maybe OBJ is the best for static models.
So I just used this existing code to load the MD2 exported from Blender.

Some details on MD2 at
[MD2 Keyframe Animation](https://code.google.com/p/libgdx-users/wiki/MD2_Keyframe_Animation).

And going back to why I did the roundabout way of generating a UV texture
when I could have just used simple color materials? Simple reason:
MD2 doesn't support color materials, only a texture material per mesh.

## Rendering with animation

The Model class in libgdx makes it easy to do keyframed animations.
Just call `model.setAnimation("AnimationName", animationTime, isLoop)`
in the render method.

## Video?

No video yet! Maybe in the next post. Good night!
