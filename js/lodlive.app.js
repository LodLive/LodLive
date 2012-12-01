$(function() {

	var spriteHome = 'spriteHome';
	if ($.jStorage.get('selectedLanguage') == 'en') {
		spriteHome = 'spriteHomeEn';
	}

	function myAlert(msg) {
		var alert = $('<div class="myalert ' + spriteHome + '"><div>' + msg + '</div></div>');
		alert.click(function() {
			$(this).remove();
		});
		if ($('.myalert').length > 0) {
			$('.myalert').remove();
		}
		$('body').append(alert);
		alert.css({
			top : $(window).height() / 2 + $('body').scrollTop()
		});
	}
	function lang(obj) {
		return $.jStorage.get('language')[$.jStorage.get('selectedLanguage')][obj];
	}
	var nextSpeed = 500;
	var fadeSpeed = 100;
	var loca = $(location).attr('href');
	if (loca.indexOf('?http') != -1) {
		$("#startPanel").remove();
		$(".paginator").remove();
		$("#footer").remove();
		$("#lang").remove();
		$('body').append('<div id="aSpace"></div>');
		var res = $.trim(loca.substring(loca.indexOf("?") + 1));
		if (res.indexOf("%3A") != -1) {
			res = res.replace(/%2F/g, '/');
			res = res.replace(/%3A/g, ':');
		}
		$("#aSpace").lodlive('init', res);
	} else {
		var boxesLength = 0;
		$.each($.jStorage.get('profile').connection, function(key, value) {
			boxesLength++;
		});
		var selBox = (boxesLength + 1) * 310;
		var pag = (selBox / 930 + "").indexOf(".") > 0 ? parseInt(selBox / 930 + "".replace(/\.[0-9]*/, '')) + 1 : selBox / 930;
		$('#boxesCont').width((pag) * 930);
		$('#nextPage,#prevPage').click(function() {
			var boxes = $('#boxesCont').not(':animated');
			var next = $(this).attr("id") == 'nextPage';
			if (boxes.length == 1) {
				$('.hdPage:visible').hide();
				$('.selectionList').remove();
				var props = {};
				var marginLeft = parseInt(boxes.css("marginLeft").replace(/px/g, ''), 10);
				if (next) {
					props = {
						marginLeft : (-930 + marginLeft) + "px"
					};
					if (marginLeft == 0) {
						$('#prevPage:hidden').fadeIn('fast');
					} else if ($('#boxesCont').css('marginLeft').replace(/[-px]/g, '') == (pag - 2) * 930) {
						$('#nextPage:visible').fadeOut('fast');
					}
				} else {
					props = {
						marginLeft : (930 + marginLeft) + "px"
					};
					if (marginLeft == -930) {
						$('#prevPage:visible').fadeOut('fast');
					} else {
						$('#nextPage:hidden').fadeIn('fast');
					}
				}
				boxes.fadeTo(fadeSpeed, 0.8, function() {
					boxes.animate(props, nextSpeed, function() {
						boxes.fadeTo(fadeSpeed, 1, function() {
							nextSpeed = 500;
							fadeSpeed = 100;
						});
					});
				});
			}
		});
		var formTemplate = '<form><div class="select"><span>' + lang('choose') + '</span><span class="' + spriteHome + ' arrow"></span></div><div class="input"><input type="text" name="startFrom" value="" readonly="readonly"/></div></form>';

		$.each($.jStorage.get('profile').connection, function(key, value) {
			var examples = value.examples;
			// index++;
			var aBox = $('<div class="startBox ' + spriteHome + '" rel="' + key + '"><h1><span>' + key.replace(/,.*/g, '').replace(/http:\/\//gi, '') + '</span><span class="' + spriteHome + ' info"></span></h1></div>');
			var descrBox = $('<div class="startBox infoHome hdPage" rel="' + key + '"><h1><span>' + key.replace(/,.*/g, '').replace(/http:\/\//gi, '') + '</span></h1><p>' + value.description[$.jStorage.get('selectedLanguage')] + '</p></div>');
			var form = $(formTemplate);
			aBox.append(form);
			// if (index == 3) {
			// page++;
			// index = 0;
			// }
			$('#startPanel').children('#boxes').children('#boxesCont').append(aBox);
			$('#startPanel').children('#boxes').children('#boxesCont').append(descrBox);
			aBox.children('h1').children('span').click(function() {
				descrBox.css({
					position : 'absolute',
					top : aBox.position().top,
					left : aBox.position().left
				});
				descrBox.fadeIn('fast');
				if ($('div.selectionList', form).length > 0) {
					form.find('div.select').click();
				}
			});
			descrBox.click(function() {
				descrBox.fadeOut('fast');
			});
			form.bind('submit', function() {
				var value = $(this).find('input[name=startFrom]').val();
				if (value != '') {
					document.location = '?' + $.trim(value);
				} else {
					myAlert(lang('impostaUnaURI'));
				}
				return false;
			});
			form.find('div.select').toggle(function() {
				var ele = $(this);
				var jExemples = $('<div class="selectionList"></div>');
				jExemples.append('<div class="selectEle" rel="inserisci"><span>' + lang('addUri') + '</span></div>');
				jExemples.append('<div class="selectEle" rel="cerca"><span>' + lang('findResource') + '</span></div>');
				if (examples) {
					for ( var a = 0; a < examples.length; a++) {
						jExemples.append('<div class="selectEle" rel="' + examples[a].uri + '"><span>' + lang('example') + ' - ' + examples[a].label + '</span></div>');
					}
				}
				jExemples.hover(function() {
				}, function() {
					ele.click();
				});
				form.append(jExemples);
				form.find('.selectEle').click(function() {
					ele.click();
					var label = $(this).attr('rel');
					if (label == 'cerca') {
						form.parent().setBackgroundPosition({
							y : -320
						});
						if ($('div.cerca', form).length == 0) {
							var cerca = $('<div class="cerca"><div class="select"><span>' + lang('choose') + '</span><span class="' + spriteHome + ' arrow"></span></div><div class="inputClass"><input type="text" name="classFrom" value="" readonly="readonly"/></div></div>');
							form.find('input[name=startFrom]').val('').attr('readonly', 'readonly').css({
								background : '#bdbdbd',
								color : '#575757'
							}).parent().css({
								background : '#bdbdbd'
							}).before(cerca);
							form.find('.inviaForm').attr("style", 'top: 20px;');

							var jClasses = $('<div class="selectionList" style="display:none"></div>');
							var template = '<div class="selectEle" ><span>{CONTENT}</span></div>';
							$("#aSpace").lodlive('allClasses', form.parent().attr('rel'), cerca.find('div.select > span:first'), jClasses, template);

							cerca.find('div.select').toggle(function() {
								cerca.append(jClasses);
								var ele2 = $(this);
								cerca.find('.selectEle').click(function() {
									ele2.click();
									var label = $(this).text();
									ele2.find('span:first').text(label);
									cerca.find('input[name=classFrom]').val('').removeAttr('readonly').css({
										background : '#fff',
										color : '#000'
									}).focus().parent().css({
										background : '#fff'
									});
								});
								var invia2 = $('<div class="inviaForm2"></div>');
								if (cerca.find('.inviaForm2').length != 0) {
									cerca.find('.inviaForm2').remove();
								}
								invia2.click(function() {
									$("#aSpace").lodlive('findSubject', form.parent().attr('rel'), "http://" + ele2.find('span:first').text(), cerca.find('input[name=classFrom]').val(), form.find('input[name=startFrom]'), form.find('input[name=startFrom]'));
								});
								cerca.append(invia2);
								invia2.hover(function() {
									cerca.parent().parent().setBackgroundPosition({
										x : -630
									});
								}, function() {
									cerca.parent().parent().setBackgroundPosition({
										x : -10
									});
								});
								$('.slimScrollDiv', cerca).remove();
								jClasses.css({
									display : 'block'
								});
								jClasses.slimScroll({
									height : 8 * 20,
									width : 260,
									color : '#000'
								});
								$('.slimScrollDiv', cerca).css({
									position : 'absolute',
									display : 'block',
									left : ele2.position().left,
									top : ele2.position().top + 60
								});
								$('.slimScrollDiv', cerca).hover(function() {
								}, function() {
									ele2.click();
								});
							}, function() {
								$('.slimScrollDiv', cerca).remove();
								// $('div.selectionList', cerca).remove();
							});
						}
					} else if (label == 'inserisci') {
						form.find('input[name=startFrom]').val('').removeAttr('readonly').css({
							background : '#fff',
							color : '#575757'
						}).focus().parent().css({
							background : '#fff'
						});
						$('.cerca', form).remove();
						form.find('.inviaForm').attr("style", '');
						form.parent().setBackgroundPosition({
							y : -10
						});
					} else {
						form.find('input[name=startFrom]').attr('readonly', 'readonly').css({
							background : '#bdbdbd',
							color : '#575757'
						}).val(label).parent().css({
							background : '#bdbdbd'
						});
						$('.cerca', form).remove();
						form.find('.inviaForm').attr("style", '');
						form.parent().setBackgroundPosition({
							y : -10
						});
					}
					form.find('div.select > span:first').text($(this).find('span').text());
				});
				jExemples.css({
					position : 'absolute',
					zIndex : '9999',
					left : ele.position().left,
					top : ele.position().top + 60
				});
			}, function() {
				$('div.selectionList', form).remove();
			});
			var invia = $('<div class="inviaForm"></div>');
			invia.click(function() {
				form.submit();
			});
			form.append(invia);
			invia.hover(function() {
				$(this).parent().parent().setBackgroundPosition({
					x : -320
				});
			}, function() {
				$(this).parent().parent().setBackgroundPosition({
					x : -10
				});
			});
		});

		var firstLine = $('#firstLineBoxes');
		liveOnlodLive($('#startPanel').children('#boxes').children('#boxesCont'));

		orangeBox(firstLine, formTemplate);
		blueBox(firstLine, formTemplate);
		firstLine.append('<div class="startBox ' + spriteHome + '" id="boxV"><h1><span>' + lang('insertData') + '</span><span class="' + spriteHome + ' info"></span></h1></div>');

		$('#menu').find('a[href^=#]').click(function() {
			var text = $('<div class="text ' + spriteHome + '"><h3>' + $(this).text() + '</h3><div class="padding">' + $($(this).attr("href")).children('p').html() + '</div></div>');
			text.click(function() {
				$(this).remove();
			});
			if ($('.text').length > 0) {
				$('.text').remove();
			}
			$('body').append(text);
			return false;
		});

	}
	if ($.browser.msie) {
		myAlert(lang('noIe'));
	}
	function showDescrBox(aBox, descrBox) {
		aBox.children('h1').children('span').click(function() {
			descrBox.css({
				position : 'absolute',
				top : aBox.position().top,
				left : aBox.position().left
			});
			descrBox.fadeIn('fast');
			if ($('div.selectionList', form).length > 0) {
				form.find('div.select').click();
			}
		});
		descrBox.click(function() {
			descrBox.fadeOut('fast');
		});
	}
	function addSubmit(form) {
		var invia = $('<div class="inviaForm"></div>');
		invia.click(function() {
			form.submit();
		});
		form.append(invia);
		invia.hover(function() {
			$(this).parent().parent().setBackgroundPosition({
				x : -320
			});
		}, function() {
			$(this).parent().parent().setBackgroundPosition({
				x : -10
			});
		});
		form.bind('submit', function() {
			var value = $(this).find('input[name=startFrom]').val();
			if (value != '') {
				document.location = '?' + $.trim(value);
			} else {
				myAlert(lang('impostaUnaURI'));
			}
			return false;
		});
	}
	function blueBox(firstLine, formTemplate) {
		var aBox = $('<div class="startBox ' + spriteHome + '" id="boxB"><h1><span>' + lang('insertUri') + '</span><span class="' + spriteHome + ' info"></span></h1></div>');
		firstLine.append(aBox);
		var descrBox = $('<div class="startBox infoHome hdPage" ><h1><span>' + lang('insertUri') + '</span></h1><p>' + lang('insertUriDescription') + '</p></div>');
		firstLine.append(descrBox);
		showDescrBox(aBox, descrBox);
		var form = $(formTemplate);
		var input = form.find('div.input');
		var textarea = $("<div class=\"input textarea\"><textarea name=\"startFrom\"></textarea></div>");
		input.before(textarea);
		input.remove();

		form.children('.select').remove();
		form.find('input').attr("readonly", false);
		firstLine.children('#boxB').append(form);
		addSubmit(form);
		form.find('.inviaForm').attr("style", 'top: 138px');
	}
	function liveOnlodLive(dest) {
		var aBox = $('<div class="startBox ' + spriteHome + ' endpList"></div>');
		dest.prepend(aBox);
		var form = $('<form><div class="select"><span>' + lang('choose') + '</span><span class="' + spriteHome + ' arrow"></span></div></form>');
		aBox.append(form);
		aBox.find('div.select').toggle(function() {
			var ele = $(this);
			var jEndpoints = $('<div class="selectionList"></div>');

			$.each($.jStorage.get('profile').connection, function(key, value) {
				jEndpoints.append('<div class="selectEle" rel="' + key + '"><span>' + key.replace(/,.*/g, '').replace(/http:\/\//gi, '') + '</span></div>');
			});

			form.append(jEndpoints);
			jEndpoints.css({
				left : ele.position().left
			});
			form.find('.selectEle').click(function() {
				ele.click();
				var label = $(this).attr('rel');
				var selBox = $("div[rel='" + label + "'].startBox:first").position().left + 310;
				var pag = (selBox / 930 + "").indexOf(".") > 0 ? parseInt(selBox / 930 + "".replace(/\.[0-9]*/, '')) + 1 : selBox / 930;
				for ( var a = 0; a < pag - 1; a++) {
					$.doTimeout(205 * a, function() {
						nextSpeed = 0;
						fadeSpeed = 0;
						$("#nextPage").click();
					});
				}
			});
			$('.slimScrollDiv', form).remove();
			jEndpoints.css({
				display : 'block'
			});
			jEndpoints.slimScroll({
				height : 5 * 20,
				width : 200,
				color : '#000'
			});
			$('.slimScrollDiv', form).css({
				position : 'absolute',
				display : 'block',
				zIndex : '9999',
				left : ele.position().left,
				top : ele.position().top + 280
			});
			$('.slimScrollDiv', form).hover(function() {
			}, function() {
				aBox.find('div.select').click();
			});

		}, function() {
			$('.slimScrollDiv', form).remove();
		});

	}
	function orangeBox(firstLine, formTemplate) {
		var aBox = $('<div class="startBox ' + spriteHome + '" id="boxO"><h1><span>' + lang('simpleSearch') + '</span><span class="' + spriteHome + ' info"></span></h1></div>');
		firstLine.append(aBox);
		var descrBox = $('<div class="startBox infoHome hdPage" ><h1><span>' + lang('simpleSearch') + '</span></h1><p>' + lang('simpleSearchDescription') + '</p></div>');
		firstLine.append(descrBox);
		showDescrBox(aBox, descrBox);

		var form = $(formTemplate);
		firstLine.children('#boxO').append(form);

		form.children('.input').before($('<div class="inputClass"><input type="text" name="classFrom" value="" readonly="readonly"></div>'));
		form.find('div.select').toggle(function() {
			var ele = $(this);
			var jEndpoints = $('<div class="selectionList"></div>');
			jEndpoints.append('<div class="selectEle" rel="dbpedia"><span>dbpedia.org</span></div>');
			jEndpoints.append('<div class="selectEle" rel="freebase"><span>freebase.com</span></div>');
			jEndpoints.hover(function() {
			}, function() {
				ele.click();
			});
			form.append(jEndpoints);
			jEndpoints.css({
				position : 'absolute',
				zIndex : '9999',
				left : ele.position().left,
				top : ele.position().top + 60
			});
			form.find('.selectEle').click(function() {
				ele.click();
				var label = $(this).attr('rel');
				var ele2 = form.find('input[name=classFrom]');
				ele2.unbind('focus');
				ele2.unbind('keyup');
				ele2.val('').removeAttr('readonly').css({
					background : '#fff',
					color : '#975E1C'
				}).focus().parent().css({
					background : '#fff'
				});
				var invia2 = $('<div class="inviaForm2" style="display:none"></div>');
				var cerca = form.find('.inputClass');
				var timer = null;
				ele2.keyup(function() {
					if ($(this).val().length > 0) {
						clearTimeout(timer);
						timer = setTimeout(function() {
							invia2.click();
						}, 250);
					}
				});
				ele2.focus(function() {
					form.find('.selectionList').remove();
					invia2.click();
				});
				invia2.click(function() {
					form.find('.selectionList').remove();
					if (ele2.val().length > 0) {
						form.children('div.input').children('img').remove();
						form.children('div.input').prepend('<img src="img/ajax-loader-white.gif" style="margin-left:6px;margin-top:2px"/>');
						var results = [];
						results = findConcept(label, ele2.val(), function() {
							form.children('div.input').children('img').remove();
							var jClasses = $('<div class="selectionList"></div>');
							for ( var int = 0; int < results.length; int++) {
								var row = results[int];
								jClasses.append('<div class="selectEle" ><span title="' + decodeURIComponent(row.uri) + '">' + row.label + '</span></div>');
							}
							form.append(jClasses);
							jClasses.find('span').click(function() {
								ele2.val($(this).text());
								form.find('input[name=startFrom]').val($(this).attr('title'));
								$('.selectionList').remove();
							});
							jClasses.hover(function() {
							}, function() {
								form.find('.selectionList').remove();
							});
							jClasses.css({
								position : 'absolute',
								zIndex : '9999',
								display : 'block',
								left : ele2.position().left,
								top : ele2.position().top + 20
							});
						}, function() {
							form.children('div.input').children('img').remove();
						});

					}
				});
				cerca.append(invia2);
				invia2.hover(function() {
					cerca.parent().parent().setBackgroundPosition({
						x : -630
					});
				}, function() {
					cerca.parent().parent().setBackgroundPosition({
						x : -10
					});
				});
				/*
				 * form.parent().setBackgroundPosition({ y : -10 });
				 */
				form.children('div.select').children('span:first').text($(this).find('span').text());
			});
		}, function() {
			$('div.selectionList', form).remove();
		});
		addSubmit(form);

		form.find('.inviaForm').attr("style", 'top: 60px');
	}
	var connection = null;
	function findConcept(type, value, callback, onAbort) {
		try {
			connection.abort();
			// onAbort();
		} catch (e) {
		}
		var result = [];
		if (type == 'dbpedia') {
			connection = $.ajax({
				url : 'http://lookup.dbpedia.org/api/search.asmx/PrefixSearch?QueryClass=&MaxHits=20&QueryString=' + value,
				async : true,
				success : function(data) {
					var xml = $(data);
					xml.find('Result').each(function() {
						result.push({
							uri : $(this).children('URI').text(),
							label : $(this).children('Label').text()
						});
						callback();
					});
					if (xml.find('Result').length == 0) {
						onAbort();
					}
				},
				complete : function(a, b) {
					if (b == 'error' || b == 'parsererror' || b == 'timeout') {
						myAlert(lang('enpointNotAvailableOrSLow') + "<br />https://lookup.dbpedia.org " + "(" + b + ")");
						onAbort();
					}
				}
			});
		} else if (type == 'freebase') {
			connection = $.ajax({
				url : 'https://www.googleapis.com/freebase/v1/search?query=' + value + '&mql_output={"id":null,"name":null}&lang=en&key=AIzaSyBtTcMfVJVhjmhh_MdzeBCnuIC4J0WzPXQ',
				async : true,
				success : function(json) {
					for ( var int = 0; int < json.result.length; int++) {
						var row = json.result[int];
						result.push({
							uri : 'http://rdf.freebase.com/ns/' + row.id.replace(/^\//, '').replace(/\//g, '.'),
							label : row.name ? row.name : row.id
						});
						callback();
					}
				},
				complete : function(a, b) {
					if (b == 'error' || b == 'parsererror' || b == 'timeout') {
						myAlert(lang('enpointNotAvailableOrSLow') + "<br />https://www.googleapis.com/freebase " + "(" + b + ")");
						onAbort();
					}
				}
			});
		}

		return result;
	}

});
