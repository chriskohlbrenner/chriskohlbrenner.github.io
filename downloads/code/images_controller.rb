class ImagesController < ApplicationController
  caches_page :index

  def index
    @images = Image.all
  end
end