import imageio

class MovieMaker:

    def __init__(self):
        self.moviefilename = 'gifcombined.gif'

    def setMovieFileName(self, name):
        self.moviefilename = name

    def createMovie(self, images):
        gifs = []
        for f in images:
            reader = imageio.get_reader(f)
            for i, im in enumerate(reader):
                gifs.append(im)
        imageio.mimsave(self.moviefilename, gifs)
        return self.moviefilename
