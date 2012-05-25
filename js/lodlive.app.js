$(function() {
	function myAlert(msg) {
		var alert = $('<div class="alert ' + spriteHome + '"><div>' + msg + '</div></div>');
		alert.click(function() {
			$(this).remove();
		});
		if ($('.alert').length > 0) {
			$('.alert').remove();
		}
		$('body').append(alert);
		alert.css({
			top : $(window).height() / 2 + $('body').scrollTop()
		});
	}
	function lang(obj) {
		return $.jStorage.get('language')[$.jStorage.get('selectedLanguage')][obj];
	}

	var spriteHome = 'spriteHome';
	if ($.jStorage.get('selectedLanguage') == 'en') {
		spriteHome = 'spriteHomeEn';
	}

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
		var boxesLength = 1;
		$.each($.jStorage.get('profile').connection, function(key, value) {
			boxesLength++;
		});
		var pages = (((boxesLength + 1) / 2) + "").replace(/\..*/g, "");
		for ( var int = 0; int < pages; int++) {
			$('#boxesCont').append('<div class="page" id="page' + (int + 1) + '"></div>');
		}

		$('#boxesCont').width((boxesLength % 2 > 0 ? boxesLength / 2 + 1 : boxesLength / 2) * 310);
		$('#nextPage').click(function() {
			var boxes = $('#boxesCont');
			var newBox = boxes.children('div.page:first');
			boxes.append(newBox);
			$('.hdPage:visible').fadeOut('fast');
			$('.selectionList').remove();
		});
		$('#prevPage').click(function() {
			var boxes = $('#boxesCont');
			var newBox = boxes.children('div.page:last');
			boxes.prepend(newBox);
			$('.hdPage:visible').fadeOut('fast');
			$('.selectionList').remove();
		});

		var index = -1;
		var page = 1;
		$.each($.jStorage.get('profile').connection, function(key, value) {
			var examples = value.examples;
			index++;
			var aBox = $('<div class="startBox ' + spriteHome + '" rel="' + key + '"><h1><span>' + key.replace(/,.*/g, '').replace(/http:\/\//gi, '') + '</span><span class="' + spriteHome + ' info"></span></h1></div>');
			var descrBox = $('<div class="startBox infoHome hdPage" rel="' + key + '"><h1><span>' + key.replace(/,.*/g, '').replace(/http:\/\//gi, '') + '</span></h1><p>' + value.description[$.jStorage.get('selectedLanguage')] + '</p></div>');
			var form = $('<form><div class="select"><span>' + lang('choose') + '</span><span class="' + spriteHome + ' arrow"></span></div><div class="input"><input type="text" name="startFrom" value="" readonly="readonly"/></div></form>');
			aBox.append(form);
			if (index == 2) {
				page++;
				index = 0;
			}
			$('#startPanel').children('#boxes').children('#boxesCont').children('#page' + page).append(aBox);
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
								background : '#666',
								color : '#ccc'
							}).parent().css({
								background : '#666'
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
								jClasses.hover(function() {
								}, function() {
									ele2.click();
								});
								jClasses.css({
									position : 'absolute',
									zIndex : '9999',
									display : 'block',
									left : ele2.position().left,
									top : ele2.position().top + 60
								});
								var invia2 = $('<div class="inviaForm2"></div>');
								if (cerca.find('.inviaForm2').length != 0) {
									cerca.find('.inviaForm2').remove();
								}
								invia2.click(function() {
									$("#aSpace").lodlive('findSubject', form.parent().attr('rel'), ele2.find('span:first').text(), cerca.find('input[name=classFrom]').val(), form.find('input[name=startFrom]'), form.find('input[name=startFrom]'));
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
							}, function() {
								$('div.selectionList', cerca).remove();
							});
						}
					} else if (label == 'inserisci') {
						form.find('input[name=startFrom]').val('').removeAttr('readonly').css({
							background : '#fff',
							color : '#000'
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
							background : '#666',
							color : '#ccc'
						}).val(label).parent().css({
							background : '#666'
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
			/*
			 * invia.css({ left : form.position().left + 20, top :
			 * form.position().top + 198 })
			 */
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
		if ($.jStorage.get('selectedLanguage') == 'en') {
			$('#startPanel').children('#boxes').children('#boxesCont').children('.page:last').append('<div class="startBox infoHome segnala"><h1><span>Signal an endpoint</span></h1><p>It is possible to signal an endpoint at info@lodlive.it so that it can be inserted in the application and made available at lodlive.it. Generally the best results are obtained with datasets having owl:sameAs properties towards other resources available on SPARQL endpoints.</p></div>');
		} else {
			$('#startPanel').children('#boxes').children('#boxesCont').children('.page:last').append('<div class="startBox infoHome segnala"><h1><span>Segnala un endpoint</span></h1><p>&Egrave; possibile segnalare a info@lodlive.it un endpoint di modo che sia inserito nell\'applicazione disponibile su lodlive.it. In generale si ottengono risultati migliori con dataset che hanno relazioni owl:sameAs verso altre risorse disponibili su un endpoint SPARQL. </p></div>');
		}

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
});