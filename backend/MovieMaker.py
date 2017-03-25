import imageio

# class to combine animated gif images to one
class MovieMaker:

    def __init__(self):
        self.moviefilename = 'gifcombined.gif'

    def setMovieFileName(self, name):
        self.moviefilename = name

    # combines a given array of gif images into one gif animation and
    # returns a string with the name of the image file
    def createMovie(self, images):
        gifs = []
        for f in images:
            reader = imageio.get_reader(f)
            for i, im in enumerate(reader):
                gifs.append(im)
        imageio.mimsave(self.moviefilename, gifs)
        return self.moviefilename
