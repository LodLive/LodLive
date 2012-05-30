/*
 * 
 * lodLive 1.0 
 * is developed by Diego Valerio Camarda, Silvia Mazzini and Alessandro Antonuccio
 * 
 * Licensed under the MIT license
 * 
 * plase tell us if you use it! 
 * 
 * geodimail@gmail.com
 * 
 */

var debugOn = false;
(function($, lodLiveProfile) {
	$.jsonp.setup({
		cache : true,
		callbackParameter : 'callback',
		callback : 'lodlive',
		timeout : 30000
	});

	var methods = {
		init : function(firstUri) {
			var context = this;
			context.append('<div id="lodlogo" class="sprite"></div>');

			// inizializzo il contenitore delle variabili di ambiente
			var storeIdsCleaner = $.jStorage.index();
			for ( var int = 0; int < storeIdsCleaner.length; int++) {
				if (storeIdsCleaner[int].indexOf("storeIds-") == 0) {
					$.jStorage.deleteKey(storeIdsCleaner[int]);
				}
			}
			$.jStorage.set('imagesMap', {});
			$.jStorage.set('mapsMap', {});

			// $.jStorage.set('storeIds',{});
			// template della query

			// creo il primo box, lo aggiungo al documento e lo posiziono
			// orizzontalmente nel centro
			var firstBox = $($.jStorage.get('boxTemplate'));
			context.lodlive('centerBox', firstBox);
			context.append(firstBox);
			firstBox.attr("id", MD5(firstUri));
			firstBox.attr("rel", firstUri);
			firstBox.css({
				'zIndex' : 1
			});

			// inizializzo la mappa delle classi
			$.jStorage.set('classMap', {
				counter : 1
			});

			// imposto le dimensioni dell'area di lavoro
			context.height($(document).height());
			context.width($(document).width());

			// attivo le funzioni per il drag
			context.lodlive('renewDrag', context.children('.boxWrapper'));

			// carico il primo documento
			context.lodlive('openDoc', firstUri, firstBox);

			context.lodlive('controlPanel', 'init');
			// context.lodlive('controlPanel', 'move');
			context.lodlive('msg', '', 'init');
			// context.lodlive('msg', '', 'move');

			$(window).bind('scroll', function() {
				context.lodlive('docInfo', null, 'move');
				context.lodlive('controlPanel', 'move');
			});
			$(window).bind('resize', function() {
				context.lodlive('docInfo', '', 'close');
				$('#controlPanel').remove();
				context.lodlive('controlPanel', 'init');
				// $(".tipsy").remove();
			});

		},
		close : function() {
			document.location = document.location.href.substring(0, document.location.href.indexOf("?"));
		},
		composeQuery : function(resource, module, testURI) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var url = "";
			var res = "";

			$.each(lodLiveProfile.connection, function(key, value) {
				var keySplit = key.split(",");
				for ( var a = 0; a < keySplit.length; a++) {
					if ((testURI ? testURI : resource).indexOf(keySplit[a]) != -1) {
						res = value.sparql[module].replace(/\{URI\}/ig, resource);
						if (value.proxy) {
							url = value.proxy + '?endpoint=' + value.endpoint + "&" + (value.endpointType ? $.jStorage.get('endpoints')[value.endpointType] : $.jStorage.get('endpoints')['all']) + "&query=" + encodeURIComponent(res);
						} else {
							url = value.endpoint + "?" + (value.endpointType ? $.jStorage.get('endpoints')[value.endpointType] : $.jStorage.get('endpoints')['all']) + "&query=" + encodeURIComponent(res);
						}
						return false;
					}
				}
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	composeQuery ');
			}
			if (url == '') {
				url = 'http://system/dummy?' + resource;
			}
			return url;
		},
		doStats : function(uri) {
			if ($('#stats').length == 0) {
				$('body').append('<div id="stats"><iframe src="stats.html?' + uri + '" style="display:none"></iframe></div>');
			} else if ($('#stats').children('iframe').length == 10) {
				$('#stats').empty();
				$('#stats').append('<iframe src="stats.html?' + uri + '" style="display:none"></iframe>');
			} else {
				$('#stats').append('<iframe src="stats.html?' + uri + '" style="display:none"></iframe>');
			}
		},
		msg : function(msg, action, type, endpoint, inverse) {
			// area dei messaggi
			var msgPanel = $('#msg');
			if (action == 'init') {
				if (msgPanel.length == 0) {
					msgPanel = $('<div id="msg"></div>');
					this.append(msgPanel);
				}
			} else if (action == 'move') {
				msgPanel.hide();
				msgPanel.css({
					display : 'none'
				});
			} else if (action == 'hide') {
				msgPanel.hide();
			} else {
				msgPanel.empty();
				msg = msg.replace(/\//g, '/<span style="font-size:1px"> </span>');
				msg = msg.replace(/&/g, '&<span style="font-size:1px"> </span>');
				msg = msg.replace(/%/g, '%<span style="font-size:1px"> </span>');
				msg = msg.replace(/\|/g, '<br />');
				var msgs = msg.split(" \n ");
				if (type == 'fullInfo') {
					msgPanel.append("<div class=\"corner sprite\"></div>");
					msgPanel.append("<div class=\"endpoint\">" + endpoint + "</div>");
					if (msgs.length == 2) {
						msgPanel.append("<div class=\"separline sprite\"></div>");
						msgPanel.append("<div class=\"from upperline\">" + (msgs[0].length > 200 ? msgs[0].substring(0, 200) + "..." : msgs[0]) + "</div>");
						msgPanel.append("<div class=\"separline sprite\"></div>");
						msgPanel.append("<div class=\"from upperline\">" + msgs[1] + "</div>");
					} else {
						msgPanel.append("<div class=\"separline sprite\"></div>");
						msgPanel.append("<div class=\"from upperline\">" + msgs[0] + "</div>");
					}
				} else {
					if (msgs.length == 2) {
						msgPanel.append("<div class=\"from\">" + msgs[0] + "</div>");
						if (inverse) {
							msgPanel.append("<div class=\"separ inverse sprite\"></div>");
						} else {
							msgPanel.append("<div class=\"separ sprite\"></div>");
						}

						msgPanel.append("<div class=\"from\">" + msgs[1] + "</div>");
					} else {
						msgPanel.append("<div class=\"from\">" + msgs[0] + "</div>");
					}
				}
				/*
				 * msgPanel.css({ left : $('body').scrollLeft(), top :
				 * $('body').scrollTop() + $(window).height() -
				 * msgPanel.height(), zIndex : 99999999 });
				 */
				msgPanel.css({
					left : 0,
					top : $(window).height() - msgPanel.height(),
					position : 'fixed',
					zIndex : 99999999
				});
				msgPanel.show();
			}
		},
		controlPanel : function(action) {
			var context = this;
			if (debugOn) {
				start = new Date().getTime();
			}
			// pannello di controllo dell'applicazione
			var panel = $('#controlPanel');
			if (action == 'init') {
				panel = $('<div id="controlPanel"></div>');
				panel.css({
					left : 0,
					top : 10,
					position : 'fixed',
					zIndex : 999
				});
				panel.append('<div class="panel options sprite" ></div>');
				panel.append('<div class="panel legend sprite" ></div>');
				panel.append('<div class="panel help sprite" ></div>');
				panel.append('<div class="panel" ></div>');
				panel.append('<div class="panel2 maps sprite" ></div>');
				panel.append('<div class="panel2 images sprite" ></div>');

				panel.children('.panel,.panel2').hover(function() {
					$(this).setBackgroundPosition({
						y : -450
					});
				}, function() {
					$(this).setBackgroundPosition({
						y : -400
					});
				});

				context.append(panel);

				panel.attr("data-top", panel.position().top);
				panel.children('.panel').click(function() {
					panel.children('.panel,.panel2').hide();
					var close = $('<div class="panel close sprite" ></div>');
					close.click(function() {
						$(this).remove();
						panel.children('#panelContent').remove();
						panel.removeClass("justX");
						panel.children('.panel,.panel2').show();
					});
					close.hover(function() {
						$(this).setBackgroundPosition({
							y : -550
						});
					}, function() {
						$(this).setBackgroundPosition({
							y : -500
						});
					});
					panel.append(close);
					close.css({
						position : 'absolute',
						left : 241,
						top : 0
					});
					var panelContent = $('<div id="panelContent"></div>');
					panel.append(panelContent);
					if ($(this).hasClass("options")) {
						var anUl = $('<ul class="optionsList"></ul>');
						panelContent.append('<div></div>');
						panelContent.children('div').append('<h2>' + lang('options') + '</h2>').append(anUl);
						anUl.append('<li ' + ($.jStorage.get('doInverse') ? 'class="checked"' : 'class="check"') + ' data-value="inverse" ><span class="spriteLegenda"></span>' + lang('generateInverse') + '</li>');
						anUl.append('<li ' + ($.jStorage.get('doAutoExpand') ? 'class="checked"' : 'class="check"') + ' data-value="autoExpand" ><span class="spriteLegenda"></span>' + lang('autoExpand') + '</li>');
						anUl.append('<li ' + ($.jStorage.get('doAutoSameas') ? 'class="checked"' : 'class="check"') + ' data-value="autoSameas"><span class="spriteLegenda"></span>' + lang('autoSameAs') + '</li>');
						anUl.append('<li>&#160;</li>');
						anUl.append('<li class="reload"><span  class="spriteLegenda"></span>' + lang('restart') + '</li>');
						anUl.children('.reload').click(function() {
							context.lodlive('close');
						});
						anUl.children('li[data-value]').click(function() {
							if ($(this).hasClass('check')) {
								if ($(this).attr("data-value") == 'inverse') {
									$.jStorage.set('doInverse', true);
								} else if ($(this).attr("data-value") == 'autoExpand') {
									$.jStorage.set('doAutoExpand', true);
								} else if ($(this).attr("data-value") == 'autoSameas') {
									$.jStorage.set('doAutoSameas', true);
								}
								$(this).attr('class', "checked");
							} else {
								if ($(this).attr("data-value") == 'inverse') {
									$.jStorage.set('doInverse', false);
								} else if ($(this).attr("data-value") == 'autoExpand') {
									$.jStorage.set('doAutoExpand', false);
								} else if ($(this).attr("data-value") == 'autoSameas') {
									$.jStorage.set('doAutoSameas', false);
								}
								$(this).attr('class', "check");
							}
						});

					} else if ($(this).hasClass("help")) {
						var help = $('.help').children('div').clone();
						panelContent.append(help);
						if (help.height() > $(window).height() + 10) {
							panel.addClass("justX");
						}

					} else if ($(this).hasClass("legend")) {
						var legend = $('.legenda').children('div').clone();
						var counter = 0;
						legend.find("span").each(function() {
							$(this).css({
								'background-position' : '-1px -' + (counter * 20) + 'px'
							});
							counter++;
						});
						panelContent.append(legend);
						if (legend.height() > $(window).height() + 10) {
							panel.addClass("justX");
						}
					}
				});

				panel.children('.panel2').click(function() {
					panel.children('.panel,.panel2').hide();
					var close = $('<div class="panel close2 sprite" ></div>');
					close.click(function() {
						$(this).remove();
						$('#mapPanel', panel).hide();
						$('#imagePanel', panel).hide();
						panelContent.hide();
						panel.removeClass("justX");
						panel.children('.panel,.panel2').show();
					});
					close.hover(function() {
						$(this).setBackgroundPosition({
							y : -550
						});
					}, function() {
						$(this).setBackgroundPosition({
							y : -500
						});
					});
					panel.append(close);
					var panelContent = $('#panel2Content', panel);
					if (panelContent.length == 0) {
						panelContent = $('<div id="panel2Content"></div>');
						panel.append(panelContent);
					} else {
						panelContent.show();
					}
					if ($(this).hasClass("maps")) {
						var mapPanel = $('#mapPanel');
						if (mapPanel.length == 0) {
							mapPanel = $('<div id="mapPanel"></div>');
							panelContent.width(800);
							panelContent.append(mapPanel);
							$('#mapPanel').gmap3({
								action : 'init',
								options : {
									zoom : 2,
									mapTypeId : google.maps.MapTypeId.HYBRID
								}
							});
						} else {
							mapPanel.show();
						}
						context.lodlive('updateMapPanel', panel);
					} else if ($(this).hasClass("images")) {
						var imagePanel = $('#imagePanel');
						if (imagePanel.length == 0) {
							imagePanel = $('<div id="imagePanel"><span id="imgesCnt"></span></div>');
							panelContent.append(imagePanel);
						} else {
							imagePanel.show();

						}
						context.lodlive('updateImagePanel', panel);
					}
				});

			} else if (action == 'show') {

			} else if (action == 'hide') {

			} else if (action == 'move') {
				if (panel.hasClass("justX")) {
					panel.css({
						position : 'absolute',
						left : $('body').scrollLeft(),
						top : panel.attr("data-top")
					});
				} else {
					panel.css({
						left : 0,
						top : 10,
						position : 'fixed'
					});
					if (panel.position()) {
						panel.attr("data-top", panel.position().top);
					}
				}

			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	controlPanel ');
			}
		},
		updateMapPanel : function(panel) {
			var context = this;
			if ($("#mapPanel:visible", panel).length > 0) {
				$('#mapPanel').gmap3({
					action : 'clear'
				});
				var panelContent = $('#panel2Content', panel);
				panelContent.width(800);
				var close = $('.close2', panel);
				var mapsMap = $.jStorage.get('mapsMap');
				var mapSize = 0;
				for ( var prop in mapsMap) {
					if (mapsMap.hasOwnProperty(prop)) {
						mapSize++;
					}
				}
				for ( var prop in mapsMap) {
					if (mapsMap.hasOwnProperty(prop)) {
						$('#mapPanel').gmap3({
							action : 'addMarker',
							latLng : [ mapsMap[prop].lats, mapsMap[prop].longs ],
							title : unescape(mapsMap[prop].title)
						}, mapSize > 1 ? {
							action : "autofit"
						} : {});
					}
				}

				close.css({
					position : 'absolute',
					left : panelContent.width() + 1,
					top : 0
				});

			} else {
				context.lodlive('highlight', panel.children('.maps'), 2, 200, '-565px -450px');
			}
		},
		updateImagePanel : function(panel) {
			var context = this;
			var imagePanel = $('#imagePanel', panel).children("span");
			if ($("#imagePanel:visible", panel).length > 0) {
				var panelContent = $('#panel2Content', panel);
				var close = $('.close2', panel);
				var imageMap = $.jStorage.get('imagesMap');
				var mapSize = 0;
				for ( var prop in imageMap) {
					if (imageMap.hasOwnProperty(prop)) {
						mapSize++;
					}
				}
				if (mapSize > 0) {
					imagePanel.children('.amsg').remove();
					var counter = 0;
					for ( var prop in imageMap) {
						if (imageMap.hasOwnProperty(prop)) {
							for ( var a = 0; a < imageMap[prop].length; a++) {
								for ( var key in imageMap[prop][a]) {
									if (($.jStorage.get('noImagesMap', {})[prop + counter])) {
										counter--;
									} else if (imagePanel.children('.img-' + prop + '-' + counter).length == 0) {
										var img = $('<a href="' + unescape(key) + '" class="sprite relatedImage img-' + prop + '-' + counter + '"><img rel="' + unescape(imageMap[prop][a][key]) + '" src="' + unescape(key) + '"/></a>"');
										imagePanel.prepend(img);
										img.fancybox({
											'transitionIn' : 'elastic',
											'transitionOut' : 'elastic',
											'speedIn' : 400,
											'type' : 'image',
											'speedOut' : 200,
											'hideOnContentClick' : true,
											'showCloseButton' : false,
											'overlayShow' : false
										});
										img.children('img').error(function() {
											$(this).parent().remove();
											counter--;
											if (counter < 3) {
												panelContent.width(148);
											} else {
												var tot = (counter / 3 + (counter % 3 > 0 ? 1 : 0) + '').split('.')[0];
												if (tot > 7) {
													tot = 7;
												}
												panelContent.width(20 + (tot) * 128);
											}
											close.css({
												position : 'absolute',
												left : panelContent.width() + 1,
												top : 0
											});
											var noImage = $.jStorage.get('noImagesMap', {});
											noImage[prop + counter] = true;
											$.jStorage.set('noImagesMap', noImage);
											close.css({
												position : 'absolute',
												left : panelContent.width() + 1,
												top : 0
											});
										});
										img.children('img').load(function() {
											var titolo = $(this).attr('rel');
											if ($(this).width() < $(this).height()) {
												$(this).height($(this).height() * 113 / $(this).width());
												$(this).width(113);
											} else {
												$(this).css({
													width : $(this).width() * 113 / $(this).height(),
													height : 113,
													marginLeft : -(($(this).width() * 113 / $(this).height() - 113) / 2)
												});
											}
											var controls = $('<span class="imgControls"><span class="imgControlCenter" title="' + lang('showResource') + '"></span><span class="imgControlZoom" title="' + lang('zoomIn') + '"></span><span class="imgTitle">' + titolo + '</span></span>');
											$(this).parent().append(controls);
											$(this).parent().hover(function() {
												$(this).children('img').hide();
											}, function() {
												$(this).children('img').show();
											});
											controls.children('.imgControlZoom').hover(function() {
												$(this).parent().parent().setBackgroundPosition({
													x : -1955
												});
											}, function() {
												$(this).parent().parent().setBackgroundPosition({
													x : -1825
												});
											});
											controls.children('.imgControlCenter').hover(function() {
												$(this).parent().parent().setBackgroundPosition({
													x : -2085
												});
											}, function() {
												$(this).parent().parent().setBackgroundPosition({
													x : -1825
												});
											});
											controls.children('.imgControlCenter').click(function() {
												$('.close2').click();
												context.lodlive('highlight', $('#' + prop).children('.box'), 4, 200, '0 0');
												return false;
											});
											if (counter < 3) {
												panelContent.width(148);
											} else {
												var tot = (counter / 3 + (counter % 3 > 0 ? 1 : 0) + '').split('.')[0];
												if (tot > 7) {
													tot = 7;
												}
												panelContent.width(20 + (tot) * 128);
											}
											close.css({
												position : 'absolute',
												left : panelContent.width() + 1,
												top : 0
											});
										});
										if (counter < 3) {
											panelContent.width(148);
										} else {
											var tot = (counter / 3 + (counter % 3 > 0 ? 1 : 0) + '').split('.')[0];
											if (tot > 7) {
												tot = 7;
											}
											panelContent.width(20 + (tot) * 128);
											close.css({
												position : 'absolute',
												left : panelContent.width() + 1,
												top : 0
											});
										}
									}
									counter++;
									if (counter < 3) {
										panelContent.width(148);
									} else {
										var tot = (counter / 3 + (counter % 3 > 0 ? 1 : 0) + '').split('.')[0];
										if (tot > 7) {
											tot = 7;
										}
										panelContent.width(20 + (tot) * 128);
									}
									close.css({
										position : 'absolute',
										left : panelContent.width() + 1,
										top : 0
									});
								}
							}
						}
					}
				} else {
					panelContent.width(148);
					if (imagePanel.children('.amsg').length == 0) {
						imagePanel.append('<span class="amsg">' + lang('imagesNotFound') + '</span>');
					}
				}
				close.css({
					position : 'absolute',
					left : panelContent.width() + 1,
					top : 0
				});

			} else {
				context.lodlive('highlight', panel.children('.images'), 2, 200, '-610px -450px');
			}

		},
		highlight : function(object, times, speed, backmove) {
			var context = this;
			if (times > 0) {
				times--;
				var css = object.css('background-position');
				object.doTimeout(speed, function() {
					object.css({
						'background-position' : backmove
					});
					object.doTimeout(speed, function() {
						object.css({
							'background-position' : css
						});
						context.lodlive('highlight', object, times, speed, backmove);
					});
				});
			}
		},
		renewDrag : function(aDivList) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			aDivList.each(function() {
				if ($(this).attr("class").indexOf('ui-draggable') == -1) {

					$(this).draggable({
						// containment : 'parent',
						zIndex : 100,
						// handle:'.boxTitle',
						stack : '.boxWrapper',
						start : function() {
							$(".toolBox").remove();
							$('#line-' + $(this).attr("id")).clearCanvas();
							var generatedRev = $.jStorage.get('storeIds-generatedByRev-' + $(this).attr("id"));
							if (generatedRev) {
								for ( var a = 0; a < generatedRev.length; a++) {
									generated = $.jStorage.get('storeIds-generatedBy-' + generatedRev[a]);
									$('#line-' + generatedRev[a]).clearCanvas();
								}
							}
						},
						drag : function(event, ui) {
						},
						stop : function(event, ui) {
							context.lodlive('drawAllLines', $(this));
						}

					});
				}
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	renewDrag ');
			}
		},
		centerBox : function(aBox) {
			var context = this;
			if (debugOn) {
				start = new Date().getTime();
			}

			var top = ($(context).height() - 65) / 2 + ($(context).scrollTop() || 0);
			var left = ($(context).width() - 65) / 2 + ($(context).scrollLeft() || 0);
			var props = {
				position : 'absolute',
				left : left,
				top : top
			};

			window.scrollBy(-context.width(), -context.height());
			window.scrollBy($(context).width() / 2 - $(window).width() / 2 + 25, $(context).height() / 2 - $(window).height() / 2 + 65);

			try {
				aBox.animate(props, 1000);
			} catch (e) {
				aBox.css(props);
			}

			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	centerBox ');
			}
		},
		autoExpand : function(obj) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			context.find(".relatedBox:not([class*=exploded])").each(function() {
				var aId = $(this).attr("relmd5");
				var newObj = context.children('#' + aId);
				if (newObj.length > 0) {
					$(this).click();
				}
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	autoExpand ');
			}
		},
		addNewDoc : function(obj, ele, callback) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			var aId = ele.attr("relmd5");
			var newObj = context.find('#' + aId);
			var isInverse = ele.attr("class").indexOf("inverse") != -1;

			var exist = true;
			// verifico se esistono box rappresentativi dello stesso documento
			// nella pagina
			if (newObj.length == 0) {
				newObj = $($.jStorage.get('boxTemplate'));
				exist = false;
			}
			var originalCircus = $("#" + ele.attr("data-circleId"));
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	addNewDoc 01 ');
			}
			if (!isInverse) {
				if (debugOn) {
					console.debug((new Date().getTime() - start) + '	addNewDoc 02 ');
				}
				var connected = $.jStorage.get('storeIds-generatedBy-' + originalCircus.attr("id"));
				if (!connected) {
					connected = [ aId ];
				} else {
					if ($.inArray(aId, connected) == -1) {
						connected.push(aId);
					} else {
						return;
					}
				}
				if (debugOn) {
					console.debug((new Date().getTime() - start) + '	addNewDoc 03 ');
				}
				$.jStorage.set('storeIds-generatedBy-' + originalCircus.attr("id"), connected);
				connected = $.jStorage.get('storeIds-generatedByRev-' + aId);
				if (!connected) {
					connected = [ originalCircus.attr("id") ];
				} else {
					if ($.inArray(originalCircus.attr("id"), connected) == -1) {
						connected.push(originalCircus.attr("id"));
					}
				}
				if (debugOn) {
					console.debug((new Date().getTime() - start) + '	addNewDoc 04 ');
				}
				$.jStorage.set('storeIds-generatedByRev-' + aId, connected);
			}

			var propertyName = ele.attr("data-property");
			newObj.attr("id", aId);
			newObj.attr("rel", ele.attr("rel"));

			var fromInverse = isInverse ? 'div[data-property="' + ele.attr("data-property") + '"][rel="' + obj.attr("rel") + '"]' : null;
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	addNewDoc 05 ');
			}
			// nascondo l'oggetto del click e carico la risorsa successiva
			$(ele).hide();
			if (!exist) {
				if (debugOn) {
					console.debug((new Date().getTime() - start) + '	addNewDoc 06 ');
				}
				var pos = parseInt(ele.attr("data-circlePos"), 10);
				var parts = parseInt(ele.attr("data-circleParts"), 10);
				// var chordsListExpand = this.lodlive('circleChords',
				// ele.attr("data-circleParts") > 10 ? (pos % 2 > 0 ?
				// originalCircus.width() * 3 : originalCircus.width() * 2) :
				// originalCircus.width() * 5 / 2,
				// parseInt(ele.attr("data-circleParts"), 10) + 4,
				// originalCircus.position().left + obj.width() / 2,
				// originalCircus.position().top + originalCircus.height() / 2,
				// pos + 1);
				var chordsListExpand = this.lodlive('circleChords', parts > 10 ? (pos % 2 > 0 ? originalCircus.width() * 3 : originalCircus.width() * 2) : originalCircus.width() * 5 / 2, parts, originalCircus.position().left + obj.width() / 2, originalCircus.position().top + originalCircus.height() / 2, null, pos);
				context.append(newObj);
				/*
				 * newObj.css({ "left" : originalCircus.position().left +
				 * originalCircus.width() / 2 - newObj.width() / 2, "top" :
				 * originalCircus.position().top + originalCircus.height() / 2 -
				 * newObj.height() / 2, "opacity" : 0.1, "zIndex" : 99 });
				 */
				newObj.css({
					"left" : (chordsListExpand[0][0] - newObj.height() / 2),
					"top" : (chordsListExpand[0][1] - newObj.width() / 2),
					"opacity" : 1,
					"zIndex" : 99
				});

				/*
				 * newObj.animate({ "left" : (chordsListExpand[pos][0] -
				 * newObj.height() / 2), "top" : (chordsListExpand[pos][1] -
				 * newObj.width() / 2), "opacity" : 1 }, 400, '', function() {
				 */
				context.lodlive('renewDrag', context.children('.boxWrapper'));
				if (debugOn) {
					console.debug((new Date().getTime() - start) + '	addNewDoc 07 ');
				}
				if (!isInverse) {
					if (debugOn) {
						console.debug((new Date().getTime() - start) + '	addNewDoc 08 ');
					}
					if ($.jStorage.get('doInverse')) {
						context.lodlive('openDoc', $(ele).attr("rel"), newObj, fromInverse);
					} else {
						context.lodlive('openDoc', $(ele).attr("rel"), newObj);
					}
					context.lodlive('drawaLine', obj, newObj, propertyName);
				} else {
					if (debugOn) {
						console.debug((new Date().getTime() - start) + '	addNewDoc 09 ');
					}
					context.lodlive('openDoc', $(ele).attr("rel"), newObj, fromInverse);
				}
				// });
			} else {
				if (!isInverse) {
					if (debugOn) {
						console.debug((new Date().getTime() - start) + '	addNewDoc 10 ');
					}
					context.lodlive('renewDrag', context.children('.boxWrapper'));
					context.lodlive('drawaLine', obj, newObj, propertyName);
				} else {
					if (debugOn) {
						console.debug((new Date().getTime() - start) + '	addNewDoc 11 ');
					}
					try {
						// $(fromInverse).click();
					} catch (e) {
					}
				}
			}
			if (callback) {
				callback();
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	addNewDoc ');
			}
			return false;
		},
		removeDoc : function(obj, callback) {
			context = this;
			if (debugOn) {
				start = new Date().getTime();
			}
			$(".toolBox").remove();
			// $(".tipsy").remove();

			var id = obj.attr("id");
			$("#line-" + id).clearCanvas();
			var generatedRev = $.jStorage.get('storeIds-generatedByRev-' + id);
			if (generatedRev) {
				for ( var a = 0; a < generatedRev.length; a++) {
					$('#line-' + generatedRev[a]).clearCanvas();
				}
			}
			this.lodlive('docInfo', '', 'close');

			var imagesMap = $.jStorage.get("imagesMap", {});
			if (imagesMap[id]) {
				delete imagesMap[id];
				$.jStorage.set('imagesMap', imagesMap);
				context.lodlive('updateImagePanel', $('#controlPanel'));
				$('#controlPanel').find('a[class*=img-' + id + ']').remove();
			}
			var mapsMap = $.jStorage.get("mapsMap", {});
			if (mapsMap[id]) {
				delete mapsMap[id];
				$.jStorage.set('mapsMap', mapsMap);
				context.lodlive('updateMapPanel', $('#controlPanel'));
				// $('#controlPanel').find('a[class*=img-' + id + ']').remove();
			}

			obj.fadeOut('normal', null, function() {
				obj.remove();
				$("." + id).show();
				$("." + id).removeClass("exploded");

				var generated = $.jStorage.get('storeIds-generatedBy-' + id);
				var generatedRev = $.jStorage.get('storeIds-generatedByRev-' + id);
				if (generatedRev) {
					for ( var int = 0; int < generatedRev.length; int++) {
						var generatedBy = $.jStorage.get('storeIds-generatedBy-' + generatedRev[int]);
						if (generatedBy) {
							for ( var int2 = 0; int2 < generatedBy.length; int2++) {
								if (generatedBy[int2] == id) {
									generatedBy.splice(int2, 1);
								}
							}
						}
						$.jStorage.set('storeIds-generatedBy-' + generatedRev[int], generatedBy);
					}
				}

				if (generated) {
					for ( var int = 0; int < generated.length; int++) {
						var generatedBy = $.jStorage.get('storeIds-generatedByRev-' + generated[int]);
						if (generatedBy) {
							for ( var int2 = 0; int2 < generatedBy.length; int2++) {
								if (generatedBy[int2] == id) {
									generatedBy.splice(int2, 1);
								}
							}
						}
						$.jStorage.set('storeIds-generatedByRev-' + generated[int], generatedBy);
					}
				}
				generatedRev = $.jStorage.get('storeIds-generatedByRev-' + id);
				if (generatedRev) {
					for ( var a = 0; a < generatedRev.length; a++) {
						generated = $.jStorage.get('storeIds-generatedBy-' + generatedRev[a]);
						if (generated) {
							for ( var a2 = 0; a2 < generated.length; a2++) {
								context.lodlive('drawaLine', $('#' + generatedRev[a]), $("#" + generated[a2]));
							}
						}
					}
				}
				$.jStorage.set('storeIds-generatedByRev-' + id, []);
				$.jStorage.set('storeIds-generatedBy-' + id, []);

			});

			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	removeDoc ');
			}
		},
		addClick : function(obj, callback) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			// per ogni nuova risorsa collegata al documento corrente imposto le
			// azioni "onclick"

			obj.find("div.relatedBox").each(function() {
				$(this).attr("relmd5", MD5($(this).attr("rel")));
				$(this).click(function() {
					$(this).addClass("exploded");
					context.lodlive('addNewDoc', obj, $(this));
					// context.lodlive('docInfo', '', 'close');
					return false;
				});
				$(this).hover(function() {
					context.lodlive('msg', $(this).attr('data-title'), 'show', null, null, $(this).hasClass("inverse"));
				}, function() {
					context.lodlive('msg', null, 'hide');
				});
			});

			obj.find(".groupedRelatedBox").each(function() {
				$(this).toggle(function() {
					context.lodlive('docInfo', '', 'close');
					obj.find('.lastClick').removeClass('lastClick').click();
					$(this).addClass('lastClick');
					obj.find("." + $(this).attr("rel") + ":not([class*=exploded])").fadeIn('fast');
					$(this).fadeTo('fast', 0.3);
					// obj.find("." + $(this).attr("rel")).slideDown();
				}, function() {
					context.lodlive('docInfo', '', 'close');
					$(this).removeClass('lastClick');
					obj.find("." + $(this).attr("rel")).fadeOut('fast');
					$(this).fadeTo('fast', 1);
				});
				$(this).hover(function() {
					context.lodlive('msg', $(this).attr('data-title'), 'show', null, null, $(this).hasClass("inverse"));
				}, function() {
					context.lodlive('msg', null, 'hide');
				});
			});

			// aggiungo le azioni dei tools
			obj.find(".actionBox[rel=contents]").click(function() {
				context.lodlive('docInfo', obj, 'open');
			});
			obj.find(".actionBox[rel=tools]").click(function() {
				if ($(".toolBox:visible").length == 0) {
					var pos = obj.position();
					var tools = $("<div class=\"toolBox sprite\" style=\"display:none\" ><div class=\"innerActionBox remove\" rel=\"remove\" title=\"rimuovi questo box\" >&#160;</div><div class=\"innerActionBox center\" rel=\"center\" title=\"centra e chiudi le altre risorse\" >&#160;</div><div class=\"innerActionBox newpage\" rel=\"newpage\" title=\"visualizza la risorsa online\" >&#160;</div><div class=\"innerActionBox expand\" rel=\"expand\" title=\"espandi tutte le relazioni\" >&#160;</div></div>");
					context.append(tools);
					tools.css({
						top : pos.top - 23,
						left : pos.left + 26
					});
					tools.fadeIn('fast');
					tools.find(".innerActionBox[rel=expand]").each(function() {
						$(this).click(function() {
							tools.remove();
							// $('.tipsy').remove();
							context.lodlive('docInfo', '', 'close');
							var idx = 0;
							var elements = obj.find("div.relatedBox:visible");
							elements.doTimeout(250, function() {
								var elem = this.eq(idx++);
								if (elem.length) {
									elem.trigger('click');
									return true;
								}
							});
						});
						$(this).hover(function() {
							tools.setBackgroundPosition({
								y : -515
							});
						}, function() {
							tools.setBackgroundPosition({
								y : -395
							});
						});
					});
					tools.find(".innerActionBox[rel=remove]").each(function() {
						$(this).click(function() {
							// $('.tipsy').remove();
							context.lodlive('removeDoc', obj);
							tools.remove();
							context.lodlive('docInfo', '', 'close');
						});
						$(this).hover(function() {
							tools.setBackgroundPosition({
								y : -425
							});
						}, function() {
							tools.setBackgroundPosition({
								y : -395
							});
						});
					});
					tools.find(".innerActionBox[rel=newpage]").each(function() {
						$(this).click(function() {
							tools.remove();
							// $('.tipsy').remove();
							context.lodlive('docInfo', '', 'close');
							window.open(obj.attr("rel"));
						});
						$(this).hover(function() {
							$(this).parent().setBackgroundPosition({
								y : -485
							});
						}, function() {
							$(this).parent().setBackgroundPosition({
								y : -395
							});
						});

					});
					tools.find(".innerActionBox[rel=center]").each(function() {
						$(this).click(function() {
							/*
							 * } tools.remove(); // $('.tipsy').remove();
							 * context.lodlive('docInfo', '', 'close');
							 * context.lodlive('msg', '', 'hide');
							 * context.lodlive('centerBox', obj);
							 * document.lodliveVars.storeIds = {};
							 * $('.aGrouped').hide(); $('canvas').remove();
							 * context.children('.boxWrapper[id!=' +
							 * obj.attr('id') + ']').each(function() {
							 * context.lodlive('removeDoc', $(this)); }); //
							 * $('.exploded').removeClass('exploded'); //
							 * $('.lastClick').click();
							 */
							var loca = $(location).attr('href');
							if (loca.indexOf('?http') != -1) {
								document.location = loca.substring(0, loca.indexOf('?')) + '?' + obj.attr('rel');
							}
						});
						$(this).hover(function() {
							tools.setBackgroundPosition({
								y : -455
							});
						}, function() {
							tools.setBackgroundPosition({
								y : -395
							});
						});
					});
				} else {
					$(".toolBox").fadeOut('fast', null, function() {
						$(".toolBox").remove();
					});
				}
			});
			if (callback) {
				callback();
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	addClick ');
			}
		},
		parseRawResourceDoc : function(destBox, URI) {
			var context = this;
			if (debugOn) {
				start = new Date().getTime();
			}
			var uris = [];
			var bnodes = [];
			var values = [];
			if (lodLiveProfile['resourceResolver']) {
				// attivo lo sparql interno basato su sesame
				var res = lodLiveProfile['resourceResolver'].sparql['documentUri'].replace(/\{URI\}/ig, URI);
				var url = lodLiveProfile['resourceResolver'].endpoint + "?uri=" + encodeURIComponent(URI) + "&query=" + encodeURIComponent(res);
				$.jsonp({
					url : url,
					beforeSend : function() {
						$('body').append(destBox);
						destBox.html('<img style=\"margin-left:' + (destBox.width() / 2) + 'px;margin-top:147px\" src="img/ajax-loader-gray.gif"/>');
						destBox.css({
							position : 'fixed',
							left : $(window).width() - $('#docInfo').width() - 20,
							top : 0
						});
						destBox.attr("data-top", destBox.position().top);
					},
					success : function(json) {

						json = json['results']['bindings'];
						$.each(json, function(key, value) {
							if (value.object.type == 'uri') {
								eval('uris.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
							} else if (value.object.type == 'bnode') {
								eval('bnodes.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
							} else {
								eval('values.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
							}
						});
						destBox.html('');
						if (debugOn) {
							console.debug(URI + '	  ');
							console.debug(values);
						}
						context.lodlive('formatDoc', destBox, values, uris, bnodes, URI);
					},
					error : function(e, b, v) {
						destBox.html('');
						values = [ {
							'http://system/msg' : 'risorsa non trovata: ' + destBox.attr('rel')
						} ];
						context.lodlive('formatDoc', destBox, values, uris, bnodes, URI);
					}
				});
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	parseRawResourceDoc ');
			}
		},
		docInfo : function(obj, action) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			if (action == 'open') {
				var URI = obj.attr('rel');
				if ($('#docInfo').length > 0) {
					$('#docInfo').fadeOut('fast', null, function() {
						$('#docInfo').remove();
					});
					if ($('#docInfo[rel="info-' + URI + '"]').length > 0) {
						return;
					}
				}
				// predispongo il div contenente il documento
				var destBox = $('<div id="docInfo" rel="info-' + URI + '"></div>');
				var SPARQLquery = context.lodlive('composeQuery', URI, 'document');
				var uris = [];
				var bnodes = [];
				var values = [];
				if (SPARQLquery.indexOf("http://system/dummy") == 0) {
					context.lodlive('parseRawResourceDoc', destBox, URI);
				} else {
					$.jsonp({
						url : SPARQLquery,
						beforeSend : function() {
							$('body').append(destBox);
							destBox.html('<img style=\"margin-left:' + (destBox.width() / 2) + 'px;margin-top:147px\" src="img/ajax-loader-gray.gif"/>');
							destBox.css({
								position : 'fixed',
								left : $(window).width() - $('#docInfo').width() - 20,
								top : 0
							});
							destBox.attr("data-top", destBox.position().top);
						},
						success : function(json) {
							json = json['results']['bindings'];
							$.each(json, function(key, value) {
								if (value.object.type == 'uri') {
									eval('uris.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
								} else if (value.object.type == 'bnode') {
									eval('bnodes.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
								} else {
									eval('values.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
								}
							});
							destBox.html('');
							context.lodlive('formatDoc', destBox, values, uris, bnodes, URI);
						},
						error : function(e, b, v) {
							destBox.html('');
							values = [ {
								'http://system/msg' : 'risorsa non trovata: ' + destBox.attr('rel')
							} ];
							context.lodlive('formatDoc', destBox, values, uris, bnodes, URI);
						}
					});
				}
			} else if (action == 'move') {
				if ($('#docInfo').height() > $(window).height() + 10) {
					$('#docInfo').css({
						position : 'absolute',
						left : $(window).width() + $('body').scrollLeft() - $('#docInfo').width() - 20,
						top : $('#docInfo').attr("data-top")
					});
				} else {
					$('#docInfo').css({
						position : 'fixed',
						left : $(window).width() - $('#docInfo').width() - 20,
						top : 0
					});
				}

			} else {
				$('#docInfo').fadeOut('fast', null, function() {
					$('#docInfo').remove();
				});
			}

			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	docInfo ');
			}
		},
		processDraw : function(x1, y1, x2, y2, canvas, toId) {
			try {
				if (debugOn) {
					start = new Date().getTime();
				}
				// recupero il nome della proprieta'
				var label = "";

				if ($("#" + toId).length > 0) {
					label = canvas.attr("data-propertyName-" + toId);
					var labeArray = label.split("\|");
					label = "\n";
					for ( var o = 0; o < labeArray.length; o++) {
						var shortKey = $.trim(labeArray[o]);
						// calcolo una forma breve per la visualizzazione
						// dell'etichetta della proprieta'
						while (shortKey.indexOf('/') > -1) {
							shortKey = shortKey.substring(shortKey.indexOf('/') + 1);
						}
						while (shortKey.indexOf('#') > -1) {
							shortKey = shortKey.substring(shortKey.indexOf('#') + 1);
						}
						if (label.indexOf("\n" + shortKey + "\n") == -1) {
							label += shortKey + "\n";
						}
					}
				}
				var isSameAs = label.indexOf('sameAs') > -1 ? true : false;

				// eseguo i calcoli e scrivo la riga di connessione tra i cerchi
				var lineangle = (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI) + 180;
				var x2bis = x1 - Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

				canvas.rotateCanvas({
					angle : lineangle,
					x : x1,
					y : y1
				}).drawLine({
					strokeStyle : isSameAs ? "#000" : "#fff",
					strokeWidth : 1,
					strokeCap : 'bevel',
					x1 : x1,
					y1 : y1,
					x2 : x2bis,
					y2 : y1
				});

				if (lineangle > 90 && lineangle < 270) {
					canvas.rotateCanvas({
						angle : 180,
						x : (x2bis + x1) / 2,
						y : (y1 + y1) / 2
					});
				}

				canvas.drawText({// inserisco l'etichetta
					fillStyle : isSameAs ? "#000" : "#606060",
					x : (x2bis + x1) / 2,
					y : (y1 + y1 - (x1 > x2 ? 18 : -18)) / 2,
					text : (x1 > x2 ? " «" : "") + label + (x1 > x2 ? "" : "» "),
					align : "center",
					baseline : "middle",
					font : "normal 11px 'Open Sans',Verdana"
				}).restoreCanvas().restoreCanvas();

				// ed inserisco la freccia per determinarne il verso della
				// relazione
				lineangle = Math.atan2(y2 - y1, x2 - x1);
				var angle = 0.79;
				var h = Math.abs(8 / Math.cos(angle));
				var fromx = x2 - 60 * Math.cos(lineangle);
				var fromy = y2 - 60 * Math.sin(lineangle);
				var angle1 = lineangle + Math.PI + angle;
				var topx = (x2 + Math.cos(angle1) * h) - 60 * Math.cos(lineangle);
				var topy = (y2 + Math.sin(angle1) * h) - 60 * Math.sin(lineangle);
				var angle2 = lineangle + Math.PI - angle;
				var botx = (x2 + Math.cos(angle2) * h) - 60 * Math.cos(lineangle);
				var boty = (y2 + Math.sin(angle2) * h) - 60 * Math.sin(lineangle);

				canvas.drawLine({
					strokeStyle : isSameAs ? "#000" : "#fff",
					strokeWidth : 1,
					x1 : fromx,
					y1 : fromy,
					x2 : botx,
					y2 : boty
				});
				canvas.drawLine({
					strokeStyle : isSameAs ? "#000" : "#fff",
					strokeWidth : 1,
					x1 : fromx,
					y1 : fromy,
					x2 : topx,
					y2 : topy
				});

				if (debugOn) {
					console.debug((new Date().getTime() - start) + '	processDraw ');
				}
			} catch (e) {
			}
		},
		drawAllLines : function(obj) {
			var context = this;
			var generated = $.jStorage.get('storeIds-generatedBy-' + obj.attr("id"));
			var generatedRev = $.jStorage.get('storeIds-generatedByRev-' + obj.attr("id"));
			// elimino la riga se già presente (in caso di
			// spostamento di un
			// box)
			$('#line-' + obj.attr("id")).clearCanvas();
			if (generated) {
				for ( var a = 0; a < generated.length; a++) {
					context.lodlive('drawaLine', obj, $("#" + generated[a]));
				}
			}
			if (generatedRev) {
				for ( var a = 0; a < generatedRev.length; a++) {
					generated = $.jStorage.get('storeIds-generatedBy-' + generatedRev[a]);
					$('#line-' + generatedRev[a]).clearCanvas();
					if (generated) {
						for ( var a2 = 0; a2 < generated.length; a2++) {
							context.lodlive('drawaLine', $('#' + generatedRev[a]), $("#" + generated[a2]));
						}
					}
				}

			}
		},
		drawaLine : function(from, to, propertyName) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			var pos1 = from.position();
			var pos2 = to.position();
			var aCanvas = $("#line-" + from.attr("id"));
			// console.debug(new Date().getTime()+'moving - '+(new Date())+" -
			// #line-" +
			// from.attr("id") + "-" + to.attr("id"))
			if (aCanvas.length == 1) {
				if (propertyName) {
					aCanvas.attr("data-propertyName-" + to.attr("id"), propertyName);
				}
				context.lodlive('processDraw', pos1.left + from.width() / 2, pos1.top + from.height() / 2, pos2.left + to.width() / 2, pos2.top + to.height() / 2, aCanvas, to.attr("id"));
			} else {
				aCanvas = $("<canvas data-propertyName-" + to.attr("id") + "=\"" + propertyName + "\" height=\"" + context.height() + "\" width=\"" + context.width() + "\" id=\"line-" + from.attr("id") + "\"></canvas>");
				context.append(aCanvas);
				aCanvas.css({
					'position' : 'absolute',
					'zIndex' : '0',
					'top' : 0,
					'left' : 0
				});
				context.lodlive('processDraw', pos1.left + from.width() / 2, pos1.top + from.height() / 2, pos2.left + to.width() / 2, pos2.top + to.height() / 2, aCanvas, to.attr("id"));
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	drawaLine ');
			}
		},
		// formatto ed inserisco i valori recuperati dal json
		formatDoc : function(destBox, values, uris, bnodes, URI) {
			if (debugOn) {
				console.debug("formatDoc " + 0);
				start = new Date().getTime();
			}
			var context = this;
			// recupero il doctype per caricare le configurazioni specifiche
			var docType = this.lodlive('getJsonValue', uris, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'default');
			// carico le configurazioni relative allo stile
			destBox.addClass(this.lodlive("getProperty", "document", "className", docType));
			// ed ai path degli oggetti di tipo immagine
			var images = this.lodlive("getProperty", "images", "properties", docType);
			// ed ai path dei link esterni
			var weblinks = this.lodlive("getProperty", "weblinks", "properties", docType);

			// se la proprieta' e' stata scritta come stringa la trasformo in un
			// array
			if (typeof images == typeof '') {
				images = [ images ];
			}
			if (typeof weblinks == typeof '') {
				weblinks = [ weblinks ];
			}

			var result = "<div></div>";
			var jResult = $(result);
			// destBox.append(jResult);

			// estraggo i contenuti
			var contents = [];
			$.each(values, function(key, value) {
				for ( var akey in value) {
					eval('contents.push({\'' + akey + '\':\'' + value[akey] + '\'})');
				}
			});
			if (debugOn) {
				console.debug("formatDoc " + 1);
			}
			// calcolo le uri e le url dei documenti correlati
			var connectedImages = [];
			var connectedWeblinks = [];
			var types = [];
			$.each(uris, function(key, value) {
				for ( var akey in value) {
					// escludo la definizione della classe, le proprieta'
					// relative alle immagini ed ai link web
					if (akey != 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
						if ($.inArray(akey, images) != -1) {
							eval('connectedImages.push({\'' + akey + '\':\'' + value[akey] + '\'})');
						} else if ($.inArray(akey, weblinks) != -1) {
							eval('connectedWeblinks.push({\'' + akey + '\':\'' + value[akey] + '\'})');
						}
					} else {
						types.push(unescape(value[akey]));
					}
				}
			});
			if (debugOn) {
				console.debug("formatDoc " + 2);
			}
			// aggiungo al box le immagini correlate
			var imagesj = null;
			if (connectedImages.length > 0) {
				imagesj = $('<div class="section" style="height:80px"></div>');
				$.each(connectedImages, function(key, value) {
					for ( var akey in value) {
						imagesj.append("<a class=\"relatedImage\" href=\"" + unescape(value[akey]) + "\"><img src=\"" + unescape(value[akey]) + "\"/></a> ");
					}
				});
			}
			if (debugOn) {
				console.debug("formatDoc " + 3);
			}
			var webLinkResult = null;
			// aggiungo al box i link esterni correlati
			if (connectedWeblinks.length > 0) {
				webLinkResult = "<div class=\"section\"><ul style=\"padding:0;margin:0;display:block;overflow:hidden;tex-overflow:ellipses\">";
				$.each(connectedWeblinks, function(key, value) {
					for ( var akey in value) {
						webLinkResult += "<li><a class=\"relatedLink\" target=\"_blank\" data-title=\"" + akey + " \n " + unescape(value[akey]) + "\" href=\"" + unescape(value[akey]) + "\">" + unescape(value[akey]) + "</a></li>";
					}
				});
				webLinkResult += "</ul></div>";
				// jContents.append(webLinkResult);
			}
			if (debugOn) {
				console.debug("formatDoc " + 4);
			}
			// aggiungo al box le informazioni descrittive della risorsa
			var jContents = $('<div></div>');
			var topSection = $('<div class="topSection sprite"><span>&#160;</span></div>');
			jContents.append(topSection);
			topSection.find('span').each(function() {
				$(this).click(function() {
					context.lodlive('docInfo', '', 'close');
				});
				$(this).hover(function() {
					topSection.setBackgroundPosition({
						y : -410
					});
				}, function() {
					topSection.setBackgroundPosition({
						y : -390
					});
				});
			});
			if (debugOn) {
				console.debug("formatDoc " + 5);
			}
			if (types.length > 0) {
				var jSection = $("<div class=\"section\"><label data-title=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#type\">type</label><div></div></div>");
				jSection.find('label').each(function() {
					$(this).hover(function() {
						context.lodlive('msg', $(this).attr('data-title'), 'show');
					}, function() {
						context.lodlive('msg', null, 'hide');
					});
				});
				for ( var int = 0; int < types.length; int++) {
					var shortKey = types[int];
					// calcolo una forma breve per la
					// visualizzazione
					// dell'etichetta della proprieta'
					while (shortKey.indexOf('/') > -1) {
						shortKey = shortKey.substring(shortKey.indexOf('/') + 1);
					}
					while (shortKey.indexOf('#') > -1) {
						shortKey = shortKey.substring(shortKey.indexOf('#') + 1);
					}
					jSection.children('div').append("<span title=\"" + types[int] + "\">" + shortKey + " </span>");
				}
				jContents.append(jSection);
				jContents.append("<div class=\"separ sprite\"></div>");
			}
			if (debugOn) {
				console.debug("formatDoc " + 6);
			}
			if (imagesj) {
				jContents.append(imagesj);
				jContents.append("<div class=\"separ sprite\"></div>");
			}

			if (webLinkResult) {
				var jWebLinkResult = $(webLinkResult);
				jWebLinkResult.find('a').each(function() {
					$(this).hover(function() {
						context.lodlive('msg', $(this).attr('data-title'), 'show');
					}, function() {
						context.lodlive('msg', null, 'hide');
					});
				});
				jContents.append(jWebLinkResult);
				jContents.append("<div class=\"separ sprite\"></div>");
			}
			if (debugOn) {
				console.debug("formatDoc " + 7);
			}
			$.each(contents, function(key, value) {
				for ( var akey in value) {
					var shortKey = akey;
					// calcolo una forma breve per la visualizzazione
					// dell'etichetta della proprieta'
					while (shortKey.indexOf('/') > -1) {
						shortKey = shortKey.substring(shortKey.indexOf('/') + 1);
					}
					while (shortKey.indexOf('#') > -1) {
						shortKey = shortKey.substring(shortKey.indexOf('#') + 1);
					}
					try {

						var jSection = $("<div class=\"section\"><label data-title=\"" + akey + "\">" + shortKey + "</label><div>" + unescape(value[akey]) + "</div></div><div class=\"separ sprite\"></div>");
						jSection.find('label').each(function() {
							$(this).hover(function() {
								context.lodlive('msg', $(this).attr('data-title'), 'show');
							}, function() {
								context.lodlive('msg', null, 'hide');
							});
						});
						jContents.append(jSection);
					} catch (e) {
						// /console.debug(value[akey] + " --- " + shortKey);
					}
				}
			});
			if (bnodes.length > 0) {
				// processo i blanknode
				$.each(bnodes, function(key, value) {
					for ( var akey in value) {
						var shortKey = akey;
						// calcolo una forma breve per la visualizzazione
						// dell'etichetta della proprieta'
						while (shortKey.indexOf('/') > -1) {
							shortKey = shortKey.substring(shortKey.indexOf('/') + 1);
						}
						while (shortKey.indexOf('#') > -1) {
							shortKey = shortKey.substring(shortKey.indexOf('#') + 1);
						}

						var jBnode = $("<div class=\"section\"><label data-title=\"" + akey + "\">" + shortKey + "</label><span class=\"bnode\"></span></div><div class=\"separ sprite\"></div>");
						jBnode.find('label').each(function() {
							$(this).hover(function() {
								context.lodlive('msg', $(this).attr('data-title'), 'show');
							}, function() {
								context.lodlive('msg', null, 'hide');
							});
						});
						context.lodlive('resolveBnodes', unescape(value[akey]), URI, jBnode, jContents);

					}
				});
			}

			if (uris.length == 0 && bnodes.length == 0) {
				var jSection = $("<div class=\"section\"><label data-title=\"" + lang('resourceMissingDoc') + "\"></label><div>" + lang('resourceMissingDoc') + "</div></div><div class=\"separ sprite\"></div>");
				jSection.find('label').each(function() {
					$(this).hover(function() {
						context.lodlive('msg', $(this).attr('data-title'), 'show');
					}, function() {
						context.lodlive('msg', null, 'hide');
					});
				});
				jContents.append(jSection);
			}

			destBox.append(jResult);
			destBox.append(jContents);
			destBox.append("<div class=\"separLast\"></div>");

			// aggiungo le funzionalita' per la visualizzazione delle immagini
			jContents.find(".relatedImage").each(function() {
				$(this).fancybox({
					'transitionIn' : 'elastic',
					'transitionOut' : 'elastic',
					'speedIn' : 400,
					'type' : 'image',
					'speedOut' : 200,
					'hideOnContentClick' : true,
					'showCloseButton' : false,
					'overlayShow' : false
				});

				$(this).find('img').each(function() {
					$(this).load(function() {
						if ($(this).width() > $(this).height()) {
							$(this).height($(this).height() * 80 / $(this).width());
							$(this).width(80);
						} else {
							$(this).width($(this).width() * 80 / $(this).height());
							$(this).height(80);
						}
					});
					$(this).error(function() {
						$(this).attr("title", "immagine non disponibile \n" + $(this).attr("src"));
						$(this).attr("src", "img/immagine-vuota-" + $.jStorage.get('selectedLanguage') + ".png");
					});
				});
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	formatDoc ');
			}
		},
		resolveBnodes : function(val, URI, destBox, jContents) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			var SPARQLquery = context.lodlive('composeQuery', val, 'bnode', URI);

			$.jsonp({
				url : SPARQLquery,
				beforeSend : function() {
					destBox.find('span[class=bnode]').html('<img src="img/ajax-loader-black.gif"/>');

				},
				success : function(json) {
					destBox.find('span[class=bnode]').html('');
					json = json['results']['bindings'];
					$.each(json, function(key, value) {
						var shortKey = value.property.value;
						// calcolo una forma breve per la
						// visualizzazione
						// dell'etichetta della proprieta'
						while (shortKey.indexOf('/') > -1) {
							shortKey = shortKey.substring(shortKey.indexOf('/') + 1);
						}
						while (shortKey.indexOf('#') > -1) {
							shortKey = shortKey.substring(shortKey.indexOf('#') + 1);
						}
						if (value.object.type == 'uri') {

						} else if (value.object.type == 'bnode') {
							var jBnode = $("<span><label data-title=\"" + value.property.value + "\"> / " + shortKey + "</label><span class=\"bnode\"></span></span>");
							jBnode.find('label').each(function() {
								$(this).hover(function() {
									context.lodlive('msg', $(this).attr('data-title'), 'show');
								}, function() {
									context.lodlive('msg', null, 'hide');
								});
							});
							destBox.find('span[class=bnode]').attr("class", "").append(jBnode);
							context.lodlive('resolveBnodes', value.object.value, URI, destBox, jContents);
						} else {
							destBox.find('span[class=bnode]').append('<div><em title="' + value.property.value + '">' + shortKey + "</em>: " + value.object.value + '</div>');
							// destBox.find('span[class=bnode]').attr("class",
							// "");
						}
						jContents.append(destBox);
					});
				},
				error : function(e, b, v) {
					destBox.find('span').html('');

				}
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	resolveBnodes ');
			}
			return val;
		},
		format : function(destBox, values, uris, inverses) {
			var context = this;
			if (debugOn) {
				start = new Date().getTime();
			}
			var containerBox = destBox.parent('div');

			// recupero il doctype per caricare le configurazioni specifiche
			var docType = this.lodlive('getJsonValue', uris, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', 'default');
			// carico le configurazioni relative allo stile
			var aClass = this.lodlive("getProperty", "document", "className", docType);
			// destBox.addClass(aClass);
			if (aClass == null || aClass == 'standard' || aClass == '') {
				if ($.jStorage.get('classMap')[docType]) {
					aClass = $.jStorage.get('classMap')[docType];
				} else {
					var classMap = $.jStorage.get('classMap');
					aClass = "box" + $.jStorage.get('classMap').counter;
					if ($.jStorage.get('classMap').counter == 13) {
						classMap.counter = 1;
						$.jStorage.set('classMap', classMap);
					} else {
						classMap.counter = classMap.counter + 1;
						$.jStorage.set('classMap', classMap);
					}
					classMap[docType] = aClass;
					$.jStorage.set('classMap', classMap);
				}
			}
			containerBox.addClass(aClass);
			// ed ai path da mostrare nel titolo del box
			var titles = this.lodlive("getProperty", "document", "titleProperties", docType);
			// ed ai path degli oggetti di tipo immagine
			var images = this.lodlive("getProperty", "images", "properties", docType);
			// ed ai path dei link esterni
			var weblinks = this.lodlive("getProperty", "weblinks", "properties", docType);
			// e le latitudini
			var lats = this.lodlive("getProperty", "maps", "lats", docType);
			// e le longitudini
			var longs = this.lodlive("getProperty", "maps", "longs", docType);
			// e punti
			var points = this.lodlive("getProperty", "maps", "points", docType);

			// se la proprieta' e' stata scritta come stringa la trasformo in un
			// array
			if (typeof titles == typeof '') {
				titles = [ titles ];
			}
			if (typeof images == typeof '') {
				images = [ images ];
			}
			if (typeof weblinks == typeof '') {
				weblinks = [ weblinks ];
			}
			if (typeof lats == typeof '') {
				lats = [ lats ];
			}
			if (typeof longs == typeof '') {
				longs = [ longs ];
			}
			if (typeof points == typeof '') {
				points = [ points ];
			}

			// gestisco l'inserimento di messaggi di sistema come errori o altro
			titles.push('http://system/msg');

			// aggiungo al box il titolo
			var result = "<div class=\"boxTitle\"><span class=\"ellipsis_text\">";
			for ( var a = 0; a < titles.length; a++) {
				var resultArray = this.lodlive('getJsonValue', values, titles[a], titles[a].indexOf('http') == 0 ? '' : titles[a]);
				if (titles[a].indexOf('http') != 0) {
					result += unescape(titles[a]) + " ";
				} else {
					for ( var af = 0; af < resultArray.length; af++) {
						result += unescape(resultArray[af]) + " ";
					}
				}
			}
			if ((values.length == 0 && uris.length == 0) || containerBox.attr("data-endpoint").indexOf("http://system/dummy") == 0) {
				if (containerBox.attr("data-endpoint").indexOf("http://system/dummy") != -1) {
					containerBox.attr("data-endpoint", lang('endpointNotConfigured'));
				}
				if (uris.length == 0 && values.length == 0) {
					result = "<div class=\"boxTitle\" threedots=\"" + lang('resourceMissing') + "\"><a target=\"_blank\" href=\"" + containerBox.attr('rel') + "\"><span class=\"spriteLegenda\"></span>" + containerBox.attr('rel') + "</a>";
				}
			}
			result += "</span></div>";
			var jResult = $(result);

			if (jResult.text() == '') {
				jResult.text(lang('noName'));
			}
			destBox.append(jResult);
			jResult.ThreeDots({
				max_rows : 3
			});
			var resourceTitle = jResult.text();
			// posiziono il titolo al centro del box
			jResult.css({
				'marginTop' : jResult.height() == 13 ? 58 : jResult.height() == 26 ? 51 : 45,
				'height' : jResult.height() + 5
			});

			destBox.hover(function() {
				context.lodlive('msg', jResult.attr("threedots") == '' ? jResult.text() : jResult.attr("threedots") + " \n " + containerBox.attr('rel'), 'show', 'fullInfo', containerBox.attr("data-endpoint"));
			}, function() {
				context.lodlive('msg', null, 'hide');
			});

			// calcolo le uri e le url dei documenti correlati
			var connectedDocs = [];
			var invertedDocs = [];
			var propertyGroup = {};
			var propertyGroupInverted = {};

			var connectedImages = [];
			var connectedLongs = [];
			var connectedLats = [];

			var sameDocControl = [];
			$.each(uris, function(key, value) {
				for ( var akey in value) {
					// escludo la definizione della classe, le proprieta'
					// relative alle immagini ed ai link web
					if (lodLiveProfile.uriSubstitutor) {
						$.each(lodLiveProfile.uriSubstitutor, function(skey, svalue) {
							value[akey] = value[akey].replace(svalue.findStr, svalue.replaceStr);
						});
					}
					if ($.inArray(akey, images) > -1) {
						eval('connectedImages.push({\'' + value[akey] + '\':\'' + escape(resourceTitle) + '\'})');
					} else if (akey != 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && $.inArray(akey, weblinks) == -1) {
						// controllo se trovo la stessa relazione in una
						// proprieta' diversa
						if ($.inArray(value[akey], sameDocControl) > -1) {
							var aCounter = 0;
							$.each(connectedDocs, function(key2, value2) {
								for ( var akey2 in value2) {
									if (value2[akey2] == value[akey]) {
										eval('connectedDocs[' + aCounter + '] = {\'' + akey2 + ' | ' + akey + '\':\'' + value[akey] + '\'}');
									}
								}
								aCounter++;
							});
						} else {
							eval('connectedDocs.push({\'' + akey + '\':\'' + value[akey] + '\'})');
							sameDocControl.push(value[akey]);
						}
					}
				}

			});
			if (inverses) {
				sameDocControl = [];
				$.each(inverses, function(key, value) {
					for ( var akey in value) {
						if (lodLiveProfile.uriSubstitutor) {
							$.each(lodLiveProfile.uriSubstitutor, function(skey, svalue) {
								value[akey] = value[akey].replace(escape(svalue.findStr), escape(svalue.replaceStr));
							});
						}
						// controllo se trovo la stessa relazione in una
						// proprieta' diversa
						if ($.inArray(value[akey], sameDocControl) > -1) {
							var aCounter = 0;
							$.each(invertedDocs, function(key2, value2) {
								for ( var akey2 in value2) {
									if (value2[akey2] == value[akey]) {
										var theKey = akey2;
										if (akey2 != akey) {
											theKey = akey2 + ' | ' + akey;
										}
										eval('invertedDocs[' + aCounter + '] = {\'' + theKey + '\':\'' + value[akey] + '\'}');
										return false;
									}
								}
								aCounter++;
							});
						} else {
							eval('invertedDocs.push({\'' + akey + '\':\'' + value[akey] + '\'})');
							sameDocControl.push(value[akey]);
						}

					}
				});
			}
			for ( var a = 0; a < points.length; a++) {
				var resultArray = context.lodlive('getJsonValue', values, points[a], points[a]);
				for ( var af = 0; af < resultArray.length; af++) {
					if (resultArray[af].indexOf(" ") != -1) {
						eval('connectedLongs.push(\'' + unescape(resultArray[af].split(" ")[1]) + '\')');
						eval('connectedLats.push(\'' + unescape(resultArray[af].split(" ")[0]) + '\')');
					} else if (resultArray[af].indexOf("-") != -1) {
						eval('connectedLongs.push(\'' + unescape(resultArray[af].split("-")[1]) + '\')');
						eval('connectedLats.push(\'' + unescape(resultArray[af].split("-")[0]) + '\')');
					}
				}
			}
			for ( var a = 0; a < longs.length; a++) {
				var resultArray = context.lodlive('getJsonValue', values, longs[a], longs[a]);
				for ( var af = 0; af < resultArray.length; af++) {
					eval('connectedLongs.push(\'' + unescape(resultArray[af]) + '\')');
				}
			}
			for ( var a = 0; a < lats.length; a++) {
				var resultArray = context.lodlive('getJsonValue', values, lats[a], lats[a]);
				for ( var af = 0; af < resultArray.length; af++) {
					eval('connectedLats.push(\'' + unescape(resultArray[af]) + '\')');
				}
			}

			if (connectedImages.length > 0) {
				var imagesMap = $.jStorage.get("imagesMap", {});
				imagesMap[containerBox.attr("id")] = connectedImages;
				$.jStorage.set('imagesMap', imagesMap);
				context.lodlive('updateImagePanel', $('#controlPanel'));
			}
			if (connectedLongs.length > 0 && connectedLats.length > 0) {
				var mapsMap = $.jStorage.get("mapsMap", {});
				mapsMap[containerBox.attr("id")] = {
					longs : connectedLongs[0],
					lats : connectedLats[0],
					title : containerBox.attr('rel') + "\n" + escape(resourceTitle)
				};
				$.jStorage.set('mapsMap', mapsMap);
				context.lodlive('updateMapPanel', $('#controlPanel'));
			}

			var totRelated = connectedDocs.length + invertedDocs.length;

			// se le proprieta' da mostrare sono troppe cerco di accorpare
			// quelle uguali
			if (totRelated > 16) {
				$.each(connectedDocs, function(key, value) {
					for ( var akey in value) {
						if (propertyGroup[akey]) {
							var t = propertyGroup[akey];
							t.push(value[akey]);
							propertyGroup[akey] = t;
						} else {
							propertyGroup[akey] = [ value[akey] ];
						}
					}
				});
				$.each(invertedDocs, function(key, value) {
					for ( var akey in value) {
						if (propertyGroupInverted[akey]) {
							var t = propertyGroupInverted[akey];
							t.push(value[akey]);
							propertyGroupInverted[akey] = t;
						} else {
							propertyGroupInverted[akey] = [ value[akey] ];
						}
					}
				});
				totRelated = 0;
				for ( var prop in propertyGroup) {
					if (propertyGroup.hasOwnProperty(prop)) {
						totRelated++;
					}
				}
				for ( var prop in propertyGroupInverted) {
					if (propertyGroupInverted.hasOwnProperty(prop)) {
						totRelated++;
					}
				}
			}

			// calcolo le parti in cui dividere il cerchio per posizionare i
			// link
			// var chordsList = this.lodlive('circleChords',
			// destBox.width() / 2 + 12, ((totRelated > 1 ? totRelated - 1 :
			// totRelated) * 2) + 4, destBox.position().left + destBox.width() /
			// 2, destBox.position().top + destBox.height() / 2, totRelated +
			// 4);

			var chordsList = this.lodlive('circleChords', 75, 24, destBox.position().left + 65, destBox.position().top + 65);
			var chordsListGrouped = this.lodlive('circleChords', 95, 36, destBox.position().left + 65, destBox.position().top + 65);
			// aggiungo al box i link ai documenti correlati
			var a = 1;
			var inserted = {};
			var counter = 0;
			var innerCounter = 1;

			var objectList = [];
			var innerObjectList = [];
			$.each(connectedDocs, function(key, value) {
				if (counter == 16) {
					counter = 0;
				}
				if (a == 1) {
				} else if (a == 15) {
					a = 1;
				}
				for ( var akey in value) {
					var obj = null;
					if (propertyGroup[akey] && propertyGroup[akey].length > 1) {
						if (!inserted[akey]) {
							innerCounter = 1;
							inserted[akey] = true;
							// var objBox = $("<div class=\"groupedRelatedBox
							// sprite\" rel=\"" + MD5(akey) + "\" title=\"" +
							// akey + "\" >" + (propertyGroup[akey].length) +
							// "</div>");
							var objBox = $("<div class=\"groupedRelatedBox sprite\" rel=\"" + MD5(akey) + "\"    data-title=\"" + akey + " \n " + (propertyGroup[akey].length) + " risorse collegate\" ></div>");
							// containerBox.append(objBox);
							if (akey.indexOf('owl#sameAs') != -1) {
								objBox.addClass('isSameAs');
							}
							objBox.attr('style', 'top:' + (chordsList[a][1] - 8) + 'px;left:' + (chordsList[a][0] - 8) + 'px');
							objectList.push(objBox);
							// containerBox.append('<div data-circlePos="' + a +
							// '" class="showGroupedRelated ' + MD5(akey) +
							// '"></div>');
							a++;
							counter++;
						}
						// var alredyInserted = $('.relatedBox',
						// containerBox).length;
						// if (alredyInserted <
						// document.lodliveVars['relationsLimit']) {
						if (innerCounter < 25) {
							obj = $("<div class=\"aGrouped relatedBox sprite " + MD5(akey) + " " + MD5(unescape(value[akey])) + "\" rel=\"" + unescape(value[akey]) + "\"  data-title=\"" + akey + " \n " + unescape(value[akey]) + "\" ></div>");
							// containerBox.append(obj);
							obj.attr('style', 'display:none;position:absolute;top:' + (chordsListGrouped[innerCounter][1] - 8) + 'px;left:' + (chordsListGrouped[innerCounter][0] - 8) + 'px');
							obj.attr("data-circlePos", innerCounter);
							obj.attr("data-circleParts", 36);
							obj.attr("data-circleId", containerBox.attr('id'));
						}
						/*
						 * } else if (alredyInserted ==
						 * document.lodliveVars['relationsLimit']) { $('.' +
						 * MD5(akey), containerBox).append('<span
						 * class="relatedBox" title="altri elementi">[...]</span>'); }
						 */
						innerCounter++;
					} else {
						obj = $("<div class=\"relatedBox sprite " + MD5(unescape(value[akey])) + "\" rel=\"" + unescape(value[akey]) + "\"   data-title=\"" + akey + ' \n ' + unescape(value[akey]) + "\" ></div>");
						// containerBox.append(obj);
						obj.attr('style', 'top:' + (chordsList[a][1] - 8) + 'px;left:' + (chordsList[a][0] - 8) + 'px');
						obj.attr("data-circlePos", a);
						obj.attr("data-circleParts", 24);
						a++;
						counter++;
					}
					if (obj) {
						obj.attr("data-circleId", containerBox.attr('id'));
						obj.attr("data-property", akey);
						// se si tratta di un sameas applico una classe diversa
						if (akey.indexOf('owl#sameAs') != -1) {
							obj.addClass('isSameAs');
						}
						if (obj.hasClass("aGrouped")) {
							innerObjectList.push(obj);
						} else {
							objectList.push(obj);
						}
					}
				}

			});

			inserted = {};
			//
			$.each(invertedDocs, function(key, value) {
				if (counter == 16) {
					counter = 0;
				}
				if (a == 1) {
				} else if (a == 15) {
					a = 1;
				}
				for ( var akey in value) {
					var obj = null;
					if (propertyGroupInverted[akey] && propertyGroupInverted[akey].length > 1) {
						if (!inserted[akey]) {
							innerCounter = 1;
							inserted[akey] = true;
							// var objBox = $("<div class=\"groupedRelatedBox
							// sprite\" rel=\"" + MD5(akey) + "\" title=\"" +
							// akey + "\" >" + (propertyGroup[akey].length) +
							// "</div>");
							var objBox = $("<div class=\"groupedRelatedBox sprite inverse\" rel=\"" + MD5(akey) + "-i\"   data-title=\"" + akey + " \n " + (propertyGroupInverted[akey].length) + " risorse collegate\" ></div>");
							// containerBox.append(objBox);
							if (akey.indexOf('owl#sameAs') != -1) {
								objBox.addClass('isSameAs');
							}
							objBox.attr('style', 'top:' + (chordsList[a][1] - 8) + 'px;left:' + (chordsList[a][0] - 8) + 'px');
							// containerBox.append('<div data-circlePos="' + a +
							// '" class="showGroupedRelated ' + MD5(akey) +
							// '"></div>');
							objectList.push(objBox);
							a++;
							counter++;
						}
						// var alredyInserted = $('.relatedBox',
						// containerBox).length;
						// if (alredyInserted <
						// document.lodliveVars['relationsLimit']) {
						if (innerCounter < 25) {
							obj = $("<div class=\"aGrouped relatedBox sprite inverse " + MD5(akey) + "-i " + MD5(unescape(value[akey])) + " \" rel=\"" + unescape(value[akey]) + "\"  data-title=\"" + akey + " \n " + unescape(value[akey]) + "\" ></div>");
							// containerBox.append(obj);
							obj.attr('style', 'display:none;position:absolute;top:' + (chordsListGrouped[innerCounter][1] - 8) + 'px;left:' + (chordsListGrouped[innerCounter][0] - 8) + 'px');
							obj.attr("data-circlePos", innerCounter);
							obj.attr("data-circleParts", 36);
							obj.attr("data-circleId", containerBox.attr('id'));
						}
						/*
						 * } else if (alredyInserted ==
						 * document.lodliveVars['relationsLimit']) { $('.' +
						 * MD5(akey), containerBox).append('<span
						 * class="relatedBox" title="altri elementi">[...]</span>'); }
						 */
						innerCounter++;
					} else {
						obj = $("<div class=\"relatedBox sprite inverse " + MD5(unescape(value[akey])) + "\" rel=\"" + unescape(value[akey]) + "\"   data-title=\"" + akey + ' \n ' + unescape(value[akey]) + "\" ></div>");
						// containerBox.append(obj);
						obj.attr('style', 'top:' + (chordsList[a][1] - 8) + 'px;left:' + (chordsList[a][0] - 8) + 'px');
						obj.attr("data-circlePos", a);
						obj.attr("data-circleParts", 24);
						a++;
						counter++;
					}
					if (obj) {
						obj.attr("data-circleId", containerBox.attr('id'));
						obj.attr("data-property", akey);
						// se si tratta di un sameas applico una classe diversa
						if (akey.indexOf('owl#sameAs') != -1) {
							obj.addClass('isSameAs');
						}
						if (obj.hasClass("aGrouped")) {
							innerObjectList.push(obj);
						} else {
							objectList.push(obj);
						}
					}
				}

			});
			var page = 0;
			var totPages = objectList.length > 14 ? (objectList.length / 14 + (objectList.length % 14 > 0 ? 1 : 0)) : 1;
			for ( var i = 0; i < objectList.length; i++) {
				if (i % 14 == 0) {
					page++;
					var aPage = $('<div class="page page' + page + '" style="display:none"></div>');
					if (page > 1 && totPages > 1) {
						aPage.append("<div class=\"pager pagePrev sprite\" data-page=\"page" + (page - 1) + "\" style=\"top:" + (chordsList[0][1] - 8) + "px;left:" + (chordsList[0][0] - 8) + "px\"></div>");
					}
					if (totPages > 1 && page < totPages - 1) {
						aPage.append("<div class=\"pager pageNext sprite\" data-page=\"page" + (page + 1) + "\" style=\"top:" + (chordsList[15][1] - 8) + "px;left:" + (chordsList[15][0] - 8) + "px\"></div>");
					}
					containerBox.append(aPage);
				}
				containerBox.children('.page' + page).append(objectList[i]);
			}
			page = 0;
			totPages = innerObjectList.length / 24 + (innerObjectList.length % 24 > 0 ? 1 : 0);
			if (innerObjectList.length > 0) {
				containerBox.append('<div class="innerPage"></div>');
				for ( var i = 0; i < innerObjectList.length; i++) {
					containerBox.children('.innerPage').append(innerObjectList[i]);
				}
			}
			containerBox.children('.page1').fadeIn('fast');
			containerBox.children('.page').children('.pager').click(function() {
				var pager = $(this);
				containerBox.find('.lastClick').removeClass('lastClick').click();
				pager.parent().fadeOut('fast', null, function() {
					$(this).parent().children('.' + pager.attr("data-page")).fadeIn('fast');
				});
			});

			{ // aggiungo al box i tools
				// chordsList = this.lodlive('circleChords',
				// destBox.width() / 2 + 5, 24, destBox.position().left +
				// destBox.width() / 2, destBox.position().top +
				// destBox.height() / 2, 23);
				var obj = $("<div class=\"actionBox contents\" rel=\"contents\"  >&#160;</div>");
				containerBox.append(obj);

				obj = $("<div class=\"actionBox tools\" rel=\"tools\" >&#160;</div>");
				containerBox.append(obj);
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	format ');
			}
		},
		circleChords : function(radius, steps, centerX, centerY, breakAt, onlyElement) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var values = [];
			var i = 0;
			if (onlyElement) {
				// ottimizzo i cicli evitando di calcolare elementi che non
				// servono
				i = onlyElement;
				var radian = (2 * Math.PI) * (i / steps);
				values.push([ centerX + radius * Math.cos(radian), centerY + radius * Math.sin(radian) ]);
			} else {
				for (; i < steps; i++) {
					// calcolo le coodinate lungo il cerchio del box per
					// posizionare
					// strumenti ed altre risorse
					var radian = (2 * Math.PI) * (i / steps);
					values.push([ centerX + radius * Math.cos(radian), centerY + radius * Math.sin(radian) ]);
				}
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	circleChords ');
			}
			return values;
			// console.debug(xValues)
			// console.debug(yValues)
		},
		getJsonValue : function(map, key, defaultValue) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var returnVal = [];
			$.each(map, function(skey, value) {
				for ( var akey in value) {
					if (akey == key) {
						returnVal.push(unescape(value[akey]));
					}
				}
			});
			if (returnVal == []) {
				returnVal = [ defaultValue ];
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	getJsonValue');
			}
			return returnVal;
		},
		getProperty : function(area, prop, context) {
			if (debugOn) {
				start = new Date().getTime();
			}
			if (typeof context == typeof '') {
				if (lodLiveProfile[context] && lodLiveProfile[context][area]) {
					return lodLiveProfile[context][area][prop];
				}
			} else {

				for ( var a = 0; a < context.length; a++) {
					if (lodLiveProfile[context[a]] && lodLiveProfile[context[a]][area]) {
						return lodLiveProfile[context[a]][area][prop];

					}
				}
			}

			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	getProperty');
			}
			if (lodLiveProfile['default'][area]) {
				return lodLiveProfile['default'][area][prop];
			} else {
				return '';
			}
		},
		parseRawResource : function(destBox, resource, fromInverse) {
			var context = this;
			var values = [];
			var uris = [];
			if (lodLiveProfile['resourceResolver']) {
				// attivo lo sparql interno basato su sesame
				var res = lodLiveProfile['resourceResolver'].sparql['documentUri'].replace(/\{URI\}/ig, resource);
				var url = lodLiveProfile['resourceResolver'].endpoint + "?uri=" + encodeURIComponent(resource) + "&query=" + encodeURIComponent(res);
				$.jsonp({
					url : url,
					beforeSend : function() {
						destBox.children('.box').html('<img style=\"margin-top:' + (destBox.children('.box').height() / 2 - 8) + 'px\" src="img/ajax-loader.gif"/>');
					},
					success : function(json) {
						json = json['results']['bindings'];
						var conta = 0;
						$.each(json, function(key, value) {
							conta++;
							if (value.object.type == 'uri') {
								if (value.object.value != resource) {
									eval('uris.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
								}
							} else {
								eval('values.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
							}
						});
						if (debugOn) {
							console.debug((new Date().getTime() - start) + '	openDoc eval uris & values');
						}

						destBox.children('.box').html('');
						context.lodlive('format', destBox.children('.box'), values, uris);
						context.lodlive('addClick', destBox, fromInverse ? function() {
							try {
								$(fromInverse).click();
							} catch (e) {
							}
						} : null);
						if ($.jStorage.get('doAutoExpand')) {
							context.lodlive('autoExpand', destBox);
						}
					},
					error : function(e, j, k) {
						// console.debug(e);console.debug(j);
						destBox.children('.box').html('');
						var inverses = [];
						if (fromInverse) {
							eval('uris.push({\'' + fromInverse.replace(/div\[data-property="([^"]*)"\].*/, '$1') + '\':\'' + fromInverse.replace(/.*\[rel="([^"]*)"\].*/, '$1') + '\'})');
						}
						context.lodlive('format', destBox.children('.box'), values, uris, inverses);
						context.lodlive('addClick', destBox, fromInverse ? function() {
							try {
								$(fromInverse).click();
							} catch (e) {
							}
						} : null);
						if ($.jStorage.get('doAutoExpand')) {
							context.lodlive('autoExpand', destBox);
						}
					}
				});
			} else {
				// console.debug(e);console.debug(j);
				destBox.children('.box').html('');
				var inverses = [];
				if (fromInverse) {
					eval('uris.push({\'' + fromInverse.replace(/div\[data-property="([^"]*)"\].*/, '$1') + '\':\'' + fromInverse.replace(/.*\[rel="([^"]*)"\].*/, '$1') + '\'})');
				}
				context.lodlive('format', destBox.children('.box'), values, uris, inverses);
				context.lodlive('addClick', destBox, fromInverse ? function() {
					try {
						$(fromInverse).click();
					} catch (e) {
					}
				} : null);
				if ($.jStorage.get('doAutoExpand')) {
					context.lodlive('autoExpand', destBox);
				}
			}
		},
		openDoc : function(anUri, destBox, fromInverse) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			SPARQLquery = context.lodlive('composeQuery', anUri, 'documentUri');
			if ($.jStorage.get('doStats')) {
				this.lodlive('doStats', anUri);
			}
			var uris = [];
			var values = [];
			if (SPARQLquery.indexOf("endpoint=") != -1) {
				var endpoint = SPARQLquery.substring(SPARQLquery.indexOf("endpoint=") + 9);
				endpoint = endpoint.substring(0, endpoint.indexOf("&"));
				destBox.attr("data-endpoint", endpoint);
			} else {
				destBox.attr("data-endpoint", SPARQLquery.substring(0, SPARQLquery.indexOf("?")));
			}
			if (SPARQLquery.indexOf("http://system/dummy") == 0) {
				context.lodlive('parseRawResource', destBox, anUri, fromInverse);
			} else {
				$.jsonp({
					url : SPARQLquery,
					beforeSend : function() {
						destBox.children('.box').html('<img style=\"margin-top:' + (destBox.children('.box').height() / 2 - 8) + 'px\" src="img/ajax-loader.gif"/>');
					},
					success : function(json) {
						json = json['results']['bindings'];
						// var tot = json.length;
						var conta = 0;
						// var aSpan = $('<span style="color:#000"><br />gg0/' +
						// tot + '</span>');
						// destBox.children('.box').append(aSpan);
						// var control = {};
						$.each(json, function(key, value) {
							conta++;
							if (value.object.type == 'uri') {
								if (value.object.value != anUri) {
									/*
									 * if (control[value['property']['value']]) {
									 * if (control[value['property']['value']] >
									 * 24) { return true; }
									 * control[value['property']['value']] =
									 * control[value['property']['value']] + 1; }
									 * else {
									 * control[value['property']['value']] = 1; }
									 */
									eval('uris.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
								}
							} else {
								eval('values.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
							}

							// aSpan.text(conta + 'gggggg/' + tot);

						});
						if (debugOn) {
							console.debug((new Date().getTime() - start) + '	openDoc eval uris & values');
						}
						destBox.children('.box').html('');
						if ($.jStorage.get('doInverse')) {
							SPARQLquery = context.lodlive('composeQuery', anUri, 'inverse');
							var inverses = [];
							$.jsonp({
								url : SPARQLquery,
								beforeSend : function() {
									destBox.children('.box').html('<img style=\"margin-top:' + (destBox.children('.box').height() / 2 - 5) + 'px\" src="img/ajax-loader.gif"/>');
								},
								success : function(json) {
									json = json['results']['bindings'];
									var conta = 0;
									// var tot = json.length;
									// var aSpan = $('<span
									// style="color:#000"><br />0/' + tot +
									// '</span>');
									// destBox.children('.box').append(aSpan);
									$.each(json, function(key, value) {
										conta++;
										eval('inverses.push({\'' + value['property']['value'] + '\':\'' + escape(value.object.value) + '\'})');
										// aSpan.text(conta + '/' + tot);
									});
									if (debugOn) {
										console.debug((new Date().getTime() - start) + '	openDoc inverse eval uris ');
									}
									var callback = function() {
										destBox.children('.box').html('');
										context.lodlive('format', destBox.children('.box'), values, uris, inverses);
										context.lodlive('addClick', destBox, fromInverse ? function() {
											try {
												$(fromInverse).click();
											} catch (e) {
											}
										} : null);
										if ($.jStorage.get('doAutoExpand')) {
											context.lodlive('autoExpand', destBox);
										}
									};
									if ($.jStorage.get('doAutoSameas')) {
										var counter = 0;
										var tot = 0;
										$.each(lodLiveProfile.connection, function(key, value) {
											tot++;
										});
										context.lodlive('findInverseSameAs', anUri, counter, inverses, callback, tot);
									} else {
										callback();
									}

								},
								error : function(e, b, v) {
									destBox.children('.box').html('');
									context.lodlive('format', destBox.children('.box'), values, uris);
									context.lodlive('addClick', destBox, fromInverse ? function() {
										try {
											$(fromInverse).click();
										} catch (e) {
										}
									} : null);
									if ($.jStorage.get('doAutoExpand')) {
										context.lodlive('autoExpand', destBox);
									}
								}
							});
						} else {
							context.lodlive('format', destBox.children('.box'), values, uris);
							context.lodlive('addClick', destBox, fromInverse ? function() {
								try {
									$(fromInverse).click();
								} catch (e) {
								}
							} : null);
							if ($.jStorage.get('doAutoExpand')) {
								context.lodlive('autoExpand', destBox);
							}
						}
					},
					error : function(e, b, v) {
						context.lodlive('errorBox', destBox);
					}
				});
			}
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	openDoc');
			}
		},
		errorBox : function(destBox) {
			var context = this;
			destBox.children('.box').addClass("errorBox");
			destBox.children('.box').html('');
			var jResult = $("<div class=\"boxTitle\"><span>" + lang('enpointNotAvailable') + "</span></div>");
			destBox.children('.box').append(jResult);
			jResult.css({
				'marginTop' : jResult.height() == 13 ? 58 : jResult.height() == 26 ? 51 : 45
			});
			var obj = $("<div class=\"actionBox tools\">&#160;</div>");
			obj.click(function() {
				context.lodlive('removeDoc', destBox);
			});
			destBox.append(obj);
			destBox.children('.box').hover(function() {
				context.lodlive('msg', lang('enpointNotAvailableOrSLow'), 'show', 'fullInfo', destBox.attr("data-endpoint"));
			}, function() {
				context.lodlive('msg', null, 'hide');
			});

		},
		allClasses : function(SPARQLquery, destBox, destSelect, template) {
			if (debugOn) {
				start = new Date().getTime();
			}
			var context = this;
			SPARQLquery = context.lodlive('composeQuery', SPARQLquery, 'allClasses');
			var classes = [];
			$.jsonp({
				url : SPARQLquery,
				beforeSend : function() {
					destBox.html('<img src="img/ajax-loader.gif"/>');
				},
				success : function(json) {
					destBox.html(lang('choose'));
					json = json['results']['bindings'];
					$.each(json, function(key, value) {
						classes.push(json[key].object.value);
					});
					for ( var i = 0; i < classes.length; i++) {
						destSelect.append(template.replace(/\{CONTENT\}/g, classes[i]));
					}
				},
				error : function(e, b, v) {
					destSelect.append(template.replace(/\{CONTENT\}/g, 'si è verificato un errore'));
				}
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	allClasses');
			}
		},
		findInverseSameAs : function(anUri, counter, inverse, callback, tot) {
			var context = this;
			if (debugOn) {
				start = new Date().getTime();
			}
			var innerCounter = 0;
			$.each(lodLiveProfile.connection, function(key, value) {
				var SPARQLquery = value.endpoint + "?" + (value.endpointType ? $.jStorage.get('endpoints')[value.endpointType] : $.jStorage.get('endpoints')['all']) + "&query=" + escape(value.sparql['inverseSameAs'].replace(/\{URI\}/g, anUri));
				if (value.proxy) {
					SPARQLquery = value.proxy + '?endpoint=' + value.endpoint + "&" + (value.endpointType ? $.jStorage.get('endpoints')[value.endpointType] : $.jStorage.get('endpoints')['all']) + "&query=" + escape(value.sparql['inverseSameAs'].replace(/\{URI\}/g, anUri));
				}
				if (innerCounter == counter) {
					var skip = false;
					var keySplit = key.split(",");
					if (!value.useForInverseSameAs) {
						skip = true;
					} else {
						for ( var a = 0; a < keySplit.length; a++) {
							// salto i sameas interni allo stesso endpoint
							if (anUri.indexOf(keySplit[a]) != -1) {
								// skip = true;
							}
						}
					}
					if (skip) {
						counter++;
						if (counter < tot) {
							context.lodlive('findInverseSameAs', anUri, counter, inverse, callback, tot);
						} else {
							callback();
						}
						return false;
					}
					$.jsonp({
						url : SPARQLquery,
						timeout : 3000,
						success : function(json) {
							json = json['results']['bindings'];
							$.each(json, function(key, value) {
								eval('inverse.splice(1,0,{\'' + 'http://www.w3.org/2002/07/owl#sameAs' + '\':\'' + escape(value.object.value) + '\'})');
							});
							counter++;
							if (counter < tot) {
								context.lodlive('findInverseSameAs', anUri, counter, inverse, callback, tot);
							} else {
								callback();
							}
						},
						error : function(e, b, v) {
							counter++;
							if (counter < tot) {
								context.lodlive('findInverseSameAs', anUri, counter, inverse, callback, tot);
							} else {
								callback();
							}
						}
					});
					if (debugOn) {
						console.debug((new Date().getTime() - start) + '	findInverseSameAs ' + value.endpoint);
					}
				}
				innerCounter++;
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	findInverseSameAs');
			}
		},
		findSubject : function(SPARQLquery, selectedClass, selectedValue, destBox, destInput) {
			if (debugOn) {
				start = new Date().getTime();
			}
			$.each(lodLiveProfile.connection, function(key, value) {
				var keySplit = key.split(",");
				for ( var a = 0; a < keySplit.length; a++) {
					if (SPARQLquery.indexOf(keySplit[a]) != -1) {
						SPARQLquery = value.endpoint + "?" + (value.endpointType ? $.jStorage.get('endpoints')[value.endpointType] : $.jStorage.get('endpoints')['all']) + "&query=" + escape(value.sparql['findSubject'].replace(/\{CLASS\}/g, selectedClass).replace(/\{VALUE\}/g, selectedValue));
						if (value.proxy) {
							SPARQLquery = value.proxy + "?endpoint=" + value.endpoint + "&" + (value.endpointType ? $.jStorage.get('endpoints')[value.endpointType] : $.jStorage.get('endpoints')['all']) + "&query=" + escape(value.sparql['findSubject'].replace(/\{CLASS\}/g, selectedClass).replace(/\{VALUE\}/g, selectedValue));
						}
					}
				}
			});
			var values = [];
			$.jsonp({
				url : SPARQLquery,
				beforeSend : function() {
					destBox.html('<img src="img/ajax-loader.gif"/>');
				},
				success : function(json) {
					destBox.html('');
					json = json['results']['bindings'];
					$.each(json, function(key, value) {
						values.push(json[key].subject.value);
					});
					for ( var i = 0; i < values.length; i++) {
						// console.debug(destInput)
						destInput.val(values[i]);
					}
				},
				error : function(e, b, v) {
					destBox.html('errore: ' + e);
				}
			});
			if (debugOn) {
				console.debug((new Date().getTime() - start) + '	findSubject');
			}
		}
	};
	$.fn.lodlive = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.lodlive');
		}
	};

	// a causa di un baco di opera e firefox implmento una funzione apposita per
	// settare la posizione dei background
	$.fn.setBackgroundPosition = function(pos) {
		var backPos = $.trim(this.css('background-position'));
		try {
			var backPosArray = backPos.split(" ");
			if (pos.x) {
				backPosArray[0] = pos.x + 'px';
			}
			if (pos.y) {
				backPosArray[1] = pos.y + 'px';
			}
			backPos = backPosArray[0] + " " + backPosArray[1];
		} catch (e) {
			alert(e);
		}
		this.css({
			'background-position' : backPos
		});
		return this;
	};

	var MD5 = function(string) {

		function RotateLeft(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}

		function AddUnsigned(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		function F(x, y, z) {
			return (x & y) | ((~x) & z);
		}
		function G(x, y, z) {
			return (x & z) | (y & (~z));
		}
		function H(x, y, z) {
			return (x ^ y ^ z);
		}
		function I(x, y, z) {
			return (y ^ (x | (~z)));
		}

		function FF(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function GG(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function HH(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function II(a, b, c, d, x, s, ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		}
		;

		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1 = lMessageLength + 8;
			var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
			var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		}
		;

		function WordToHex(lValue) {
			var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
			}
			return WordToHexValue;
		}
		;

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";

			for ( var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		}
		;

		var x = Array();
		var k, AA, BB, CC, DD, a, b, c, d;
		var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
		var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
		var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
		var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

		string = Utf8Encode(string);

		x = ConvertToWordArray(string);

		a = 0x67452301;
		b = 0xEFCDAB89;
		c = 0x98BADCFE;
		d = 0x10325476;

		for (k = 0; k < x.length; k += 16) {
			AA = a;
			BB = b;
			CC = c;
			DD = d;
			a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
			d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
			c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
			b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
			a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
			d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
			c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
			b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
			a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
			d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
			c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
			b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
			a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
			d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
			c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
			b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
			a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
			d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
			c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
			b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
			a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
			d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
			c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
			b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
			a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
			d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
			c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
			b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
			a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
			d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
			c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
			b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
			a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
			d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
			c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
			b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
			a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
			d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
			c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
			b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
			a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
			d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
			c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
			b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
			a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
			d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
			c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
			b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
			a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
			d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
			c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
			b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
			a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
			d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
			c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
			b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
			a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
			d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
			c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
			b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
			a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
			d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
			c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
			b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
			a = AddUnsigned(a, AA);
			b = AddUnsigned(b, BB);
			c = AddUnsigned(c, CC);
			d = AddUnsigned(d, DD);
		}

		var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

		return temp.toLowerCase();

	};

	function lang(obj) {
		return $.jStorage.get('language')[$.jStorage.get('selectedLanguage')][obj];
	}

})(jQuery, $.jStorage.get('profile'));
