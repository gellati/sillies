#!/bin/python

import os
from flask import Flask, Response, request, abort, render_template_string, send_from_directory, send_file, jsonify
#from Image import Image
import image
import StringIO
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


WIDTH = 1000
HEIGHT = 800


@app.route('/<path:filename>')
def image(filename):
    try:
        w = int(request.args['w'])
        h = int(request.args['h'])
    except (KeyError, ValueError):
        return send_from_directory('.', filename)

    try:
        im = Image.open(filename)
        im.thumbnail((w, h), Image.ANTIALIAS)
        io = StringIO.StringIO()
        im.save(io, format='JPEG')
        return Response(io.getvalue(), mimetype='image/jpeg')

    except IOError:
        abort(404)

#    return send_from_directory('.', filename)

@app.route('/')
def index():
    images = []
    for root, dirs, files in os.walk('./static'):
        for filename in [os.path.join(root, name) for name in files]:
            if not filename.endswith('.gif'):
                continue
            im = Image.open(filename)
            w, h = im.size
            aspect = 1.0*w/h
            if aspect > 1.0*WIDTH/HEIGHT:
                width = min(w, WIDTH)
                height = width/aspect
            else:
                height = min(h, HEIGHT)
                width = height*aspect
            images.append({
                'width': int(width),
                'height': int(height),
                'src': filename
            })

    return send_from_directory('./static/images', filename)

@app.route('/images')
def images():
    images = []
    for root, dirs, files in os.walk('./static'):
        for filename in [os.path.join(root, name) for name in files]:
            images.append(filename)
    return jsonify({"images": images})




#    return render_template_string(TEMPLATE, **{
#        'images': images
#    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
