/* jshint esnext: true, esversion: 6 */


// requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/*! svg4everybody v2.0.3 | github.com/jonathantneal/svg4everybody */
!(function(window) {
    window.svg4everybody = (function() {
        function embed(svg, target) {
            // if the target exists
            if (target) {
                // create a document fragment to hold the contents of the target
                var fragment = document.createDocumentFragment(),
                    viewBox = target.getAttribute("viewBox");
                // conditionally set the viewBox on the svg
                svg.setAttribute("viewBox", viewBox);

                // copy the contents of the clone into the fragment
                for ( // clone the target
                    var clone = target.cloneNode(!0); clone.childNodes.length;) {
                    fragment.appendChild(clone.firstChild);
                }
                // append the fragment into the svg
                svg.appendChild(fragment);
            }
        }

        function loadreadystatechange(xhr) {
            // listen to changes in the request
            xhr.onreadystatechange = function() {
                    // if the request is ready
                    if (4 === xhr.readyState) {
                        // get the cached html document
                        var cachedDocument = xhr._cachedDocument;
                        // ensure the cached html document based on the xhr response
                        cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
                                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                            xhr._embeds.splice(0).map(function(item) {
                                // get the cached target
                                var target = xhr._cachedTarget[item.id];
                                // ensure the cached target
                                target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
                                    // embed the target into the svg
                                    embed(item.svg, target);
                            });
                    }
                }, // test the ready state change immediately
                xhr.onreadystatechange();
        }

        function svg4everybody(rawopts) {
            function oninterval() {
                // while the index exists in the live <use> collection
                for ( // get the cached <use> index
                    var index = 0; index < uses.length;) {
                    // get the current <use>
                    var use = uses[index],
                        svg = use.parentNode;
                    if (svg && /svg/i.test(svg.nodeName)) {
                        var src = use.getAttribute("xlink:href");
                        if (polyfill && (!opts.validate || opts.validate(src, svg, use))) {
                            // remove the <use> element
                            svg.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"),
                                url = srcSplit.shift(),
                                id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                                        xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                    xhr._embeds.push({
                                        svg: svg,
                                        id: id
                                    }), // prepare the xhr ready state change event
                                    loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(svg, document.getElementById(id));
                            }
                        }
                    } else {
                        // increase the index when the previous value was not "valid"
                        ++index;
                    }
                }
                // continue the interval
                requestAnimationFrame(oninterval, 67);
            }
            var polyfill, opts = Object(rawopts),
                newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
                webkitUA = /\bAppleWebKit\/(\d+)\b/,
                olderEdgeUA = /\bEdge\/(\d+)\.(\d+)\b/;
            polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || olderEdgeUA.test(navigator.userAgent) || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
            // create xhr requests object
            var requests = {},
                requestAnimationFrame = window.requestAnimationFrame || setTimeout,
                uses = document.getElementsByTagName("use");
            // conditionally start the interval if the polyfill is active
            polyfill && oninterval();
        }
        return svg4everybody;
    })();
})(window);

///

!(function(window, $) {
    $(function() {
        BF.init();
    });

    window.BF = {
        init: function() {
            var ua = navigator.userAgent;
            this.is_touch = 'ontouchstart' in window; // это тач устройство?
            this.is_webkit       = ua.match(/webkit/i);
            this.is_firefox      = ua.match(/gecko/i);
            this.is_newer_ie     = ua.match(/msie (9|([1-9][0-9]))/i);
            this.is_older_ie     = ua.match(/msie/i) && !this.is_newer_ie;
            this.is_ancient_ie   = ua.match(/msie 6/i);
            this.is_ie           = this.is_ancient_ie || this.is_older_ie || this.is_newer_ie;
            this.is_mobile_ie    = ua.indexOf('IEMobile') !== -1;
            this.is_mobile       = ua.match(/mobile/i);
            this.is_desktop       = !this.is_mobile;
            this.is_OSX          = ua.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false;
            this.is_EDGE 		= /Edge\/12./i.test(ua);

            if (this.is_desktop) {
                this.parallax();
            }

            this.form.init();
            this.events();
            this.vendor();
        },

        events: function() {
            var self = this;

            // Scroll
            var $header = $('.b_header');
            var $menu = $header.find('.menu-holder');

            var headerOverflow = $header.hasClass('overflow');

            if ( headerOverflow ) {
                var coverH = $('.b_cover').outerHeight() || 0;
                $(window).on('scroll', function() {
                    var st = window.pageYOffset;
                    $header.toggleClass('floating', (st >= Math.max(coverH - 300, 0)));
                    $header.toggleClass('animate', (st >= Math.max((coverH - 200), 0)));
                    $header.toggleClass('show', (st >= Math.max(coverH, 0)));
                });
            } else {
                $header.addClass('floating show');
            }

            // burger
            $('body').on('click touchstart', function(e) {
                if ($(e.target).is('.burger')) {
                    e.preventDefault();
                    $menu.toggleClass('show');
                }
                else if ($(e.target).closest('.b_header').length === 0) {
                    $menu.removeClass('show');
                }
            });

            // gallery
            $('.gallery-wrap').on('click', '.show-more', function(e){
                e.preventDefault();

                $(e.currentTarget).closest('.gallery-wrap').toggleClass('extend');
            });

            $('.spoilers').on('click', '.spoiler > .title', function(e){
                $(e.currentTarget).closest('.spoiler').toggleClass('extend');
            });

            // tarifs
            $('.tarif-card').on('click', '.btn', function(e) {
                e.preventDefault();
                var modal = $(e.currentTarget).attr('href');

                BF.modal.open(modal);
            });

            // modals
            $('.modal-list').on('click.close-by-button', 'a.close, a.cancel', function(e) {
                e.preventDefault();
                BF.modal.close();
            });

            $('.modal-list').on('click.close-on-overlay', function(e) {
                if (e.target == e.currentTarget) {
                    e.preventDefault();
                    BF.modal.close();
                }
            });
        },

        form: {
            init: function() {
                $('form').on('click', '.form-field', function(e) {
                    $(e.currentTarget).removeClass('error');
                });

                // form ajax submit
                $('form.ajax-send').on('submit', function(e) {
                    e.preventDefault();

                    var hasError = false;
                    var $form = $(e.currentTarget);

                    hasError = BF.form.check($form);

                    if (hasError) {
                        e.stopPropagation();
                        return false;
                    }

                    var form_data = $form.serialize();

                    // AJAX
                    var req = $.ajax(
                    {
                        url: $form.attr('action'),
                        type: $form.attr('method'),
                        dataType: 'json',
                        data: form_data
                    });

                    req.always(function(data) {
                        $form.get(0).reset();
                        $form.addClass('sended');
                    });
                });

                // form order send form (contact form 7)
                // steps
                $('.modal.form-order').on('click', 'a.select-step', e => {
                    var step = $(e.currentTarget).attr('href').replace('#', '');

                    var $form = $(e.currentTarget).closest('form');

                    if (step == 'next') {
                        BF.form.set_fields($form);
                        var hasError = BF.form.check($form);
                        if (hasError) return;

                        $form.addClass('is-step-2').removeClass('is-step-1');

                        $form.find('input[name], textarea').each(function(index, el) {
                            if (!$(el).val()) {
                                $(el).val('-');
                            }
                        });
                    } else {
                        $form.addClass('is-step-1').removeClass('is-step-2');

                        $form.find('[data-group-done]').removeAttr('data-group-done');

                        $form.find('input[name], textarea').each(function(index, el) {
                            if ($(el).val() == '-') {
                                $(el).val('');
                            }
                        });
                    }
                });

                $('.modal.form-order').on('submit', 'form', function(e) {
                    var $modal = $(e.currentTarget).closest('.modal');

                    setTimeout(function () {
                        BF.modal.open('#done');
                    }, 1000);
                });

                $('.modal.form-order').on('change', '#form-extend', function(e) {
                    var value = !!$(e.currentTarget).attr('checked');
                    var $part = $(e.currentTarget).closest('form').find('.form-part-2');

                    $part.toggleClass('hidden', !value);

                    if (value) {
                        $part.find('.form-field').not('[data-validate="false"]').attr('data-validate', true);
                    } else {
                        $part.find('.form-field').not('[data-validate="false"]').removeAttr('data-validate');
                    }

                });

                $('.modal.form-order').on('change', 'input[name="accept"]', function(e) {
                    var value = !!$(e.currentTarget).attr('checked');
                    var $btn = $(e.currentTarget).closest('form').find('.form-submit .btn');

                    if (value) {
                        $btn.removeAttr('disabled');
                    } else {
                        $btn.attr('disabled', 'disabled');
                    }
                });
            },

            set_fields: function($form) {
                var $done_fields = $form.find('.field-list');
                var form_extended = $form.find('#form-extend').attr('checked');

                var arr = [
                    { name: 'firma', el: $form.find('[name="firma"]') },
                    { name: 'name', el: $form.find('[name="name"]') },
                    { name: 'email', el: $form.find('[name="email"]') },
                    { name: 'tel', el: $form.find('[name="tel"]') },
                    { name: 'addr', el: $form.find('[name="haus"], [name="plz"]') },

                    { name: 'firma2', el: $form.find('[name="firma2"]') },
                    { name: 'name2', el: $form.find('[name="name2"]') },
                    { name: 'addr2', el: $form.find('[name="haus2"], [name="plz2"]') },

                    { name: 'comment', el: $form.find('[name="comment"]') }
                ];

                $done_fields.empty();
                arr.forEach(function(field) {
                    var is_group = false;

                    var $field = field.el;
                    var placeholder;
                    var text;

                    if (field.name == 'addr' || field.name == 'addr2') {
                        placeholder = $field.closest('.form-field-group').find('label').text();

                        if ($field.eq(0).val() && $field.eq(1).val()) {
                            text = $field.eq(0).val() + ', ' + $field.eq(1).val();
                        }

                        if (field.name == 'addr2' && !form_extended) {
                            text = '-';
                        }

                    }
                    else {
                        placeholder = $field.attr('placeholder');
                        text = $field.val();
                    }

                    if (!text) {
                        text = '-';
                    }
                    placeholder = placeholder.replace(/\(optional\)|\*/gi, '');

                    // skip this hidden fields
                    if (!form_extended && field.name != 'addr2' && $field.closest('.form-field').attr('data-empty') == 'true') {
                        return;
                    }

                    var $item = $(['<div class="field">',
                        '<div class="title"></div>',
                        '<div class="text"></div>',
                    '</div>'].join(''));

                    $item.find('.title').text(placeholder);
                    $item.find('.text').text(text);
                    $done_fields.append($item);
                });
            },

            check: function($form) {
                var result = false;
                var $fields = $form.find('.form-field');
                $fields.removeClass('error');

                $fields.each(function(index, field) {
                    var $field = $(field);
                    var validate = $(field).attr('data-validate');
                    var correct = false;
                    var value = $field.find('input, textarea').val();

                    if (validate && validate != 'false') {
                        switch (validate) {
                            case 'email':
                                correct = value.match(/.+@.+\..+/i);
                                break;
                            case 'checked':
                                correct = !!$field.find('input[type="checkbox"]').attr('checked');
                                break;
                            default:
                                correct = value.length > 0;
                        }
                    }
                    else {
                        correct = true;
                    }

                    if ( !correct ) {
                        $field.addClass('error');
                        result = true;
                    }

                });

                return result;
            }
        },

        modal: {
            open: function(modal) {
                this.close();

                var $modal = $('.modal-list').find(modal);

                if (!$modal.length) return;

                $modal.find('form').removeClass('is-step-1 is-step-2')
                $modal.find('[data-group-done]').removeAttr('data-group-done');
                $modal.find('form .form-field').removeClass('error');

                $('body').css('overflow', 'hidden');
                $('.modal-list').addClass('overlay');
                $modal.addClass('show');
            },

            close: function() {
                var $modal = $('.modal-list').find('.modal');

                $modal.find('form').removeClass('is-step-1 is-step-2')
                $modal.find('[data-group-done]').removeAttr('data-group-done');
                $modal.find('form .form-field').removeClass('error');

                $('body').css('overflow', '');
                $modal.removeClass('show done');
                $('.modal-list').removeClass('overlay');
            }
        },

        vendor: function() {
            var self = this;

            svg4everybody();

            $('.b_slider .slider').lightSlider({
                adaptiveHeight: true,
                item: 1,
                slideMargin: 0,
                loop: true,
                auto: true,
                pause: 10000,
                controls: false,
                pager: true,
                galleryMargin: 0,
                enableDrag: false
            });

            var angeslider = $('.b_ange_slider .slider').lightSlider({
                adaptiveHeight: true,
                item: 1,
                slideMargin: 0,
                controls: false,
                pager: false,
                enableDrag: true
            });

            $('.slider-preview').on('click', 'li', function(e) {
                var index = $(e.currentTarget).index();
                if (angeslider) {
                    angeslider.goToSlide(index);
                }
            });

            $('.lg-init').lightGallery({
                cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                preload: 2,
                download: false,
                hideBarsDelay: 500
            });

            if (self.is_desktop) {
                $('#video-bg').YTPlayer();
            }
        },

        parallax: function() {
            var $bg = $('.bg[data-parallax="true"]');
            var bg = $bg[0];

            if (!bg) return;
            var start = $bg.offset().top;
            var factor = 0.3;

            (function loop() {
                animateParallax();
                requestAnimationFrame(loop);
            })();

            function animateParallax() {
                var y = (window.pageYOffset - start) * factor;
                bg.style.transform = "translate3d(0," + y + "px,0)";
            }
        }
    }
})(window, jQuery);
