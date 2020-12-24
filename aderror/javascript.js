jQuery(function() {

    var queryString = window.location.search;
    var queryObject = new Object();
    queryObject["url"] = undefined
    if(queryString){
        queryString = queryString.substring(1);
        var parameters = queryString.split('&');

        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');

            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);

            queryObject[paramName] = paramValue;
        }
    }

    if ( queryObject["url"] != undefined ) {
        $(".text-container .buttons-container .border-button").attr("href",queryObject["url"]);
    };

    function ErrorPage(container, pageType, templateName) {
        this.$container = $(container);
        this.$contentContainer = this.$container.find(templateName == 'sign' ? '.sign-container' : '.content-container');
        this.pageType = pageType;
        this.templateName = templateName;
    }
    
    ErrorPage.prototype.centerContent = function () {
        var containerHeight = this.$container.outerHeight() || null
            , contentContainerHeight = this.$contentContainer.outerHeight() || null
            , top = (containerHeight - contentContainerHeight) / 2
            , offset = this.templateName == 'sign' ? -100 : 0;
    
        this.$contentContainer.css('top', top + offset);
    };
    
    ErrorPage.prototype.initialize = function () {
        var self = this;
    
        this.centerContent();
        this.$container.on('resize', function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.centerContent();
        });
    
        // fades in content on the plain template
        if (this.templateName == 'plain') {
            window.setTimeout(function () {
                self.$contentContainer.addClass('in');
            }, 500);
        }
    
        // swings sign in on the sign template
        if (this.templateName == 'sign') {
            $('.sign-container').animate({ textIndent: 0 }, {
                step: function (now) {
                    $(this).css({
                        transform: 'rotate(' + now + 'deg)',
                        'transform-origin': 'top center'
                    });
                },
                duration: 1000,
                easing: 'easeOutBounce'
            });
        }
    };
    
    var ep = new ErrorPage('body', "503", "sign");
    ep.initialize();
    
    // hack to make sure content stays centered >_<
    $(window).on('resize', function () {
        $('body').trigger('resize')
    });

});