FROM nginx

RUN apt-get update && \
	apt-get install --no-install-recommends --no-install-suggests -y git && \
	cd /opt && \
	git config --global http.sslverify false && \
	git clone https://github.com/stlab-istc-cnr/LodLive.git && \
	mv LodLive/* /usr/share/nginx/html/


COPY lodlive.profile.js /usr/share/nginx/html/js/
