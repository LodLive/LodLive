# Docker container with custom profile

This Dockerfile allows you to build a LodLive using a custom profile that can be set by editing ``lodlive.profile.js``.

#### Build LodLive using Docker
```
docker build . -t lodlive
```

#### Run LodLive using Docker

```
docker run -p 80:80 -it lodlive
```

Then LodLive will be listening on port 80, give it a try by accessing at ``http://localhost/app_en.html?https://w3id.org/arco/resource/Site/fbc21be8acbe03e05668a52b9454c6cb`` 