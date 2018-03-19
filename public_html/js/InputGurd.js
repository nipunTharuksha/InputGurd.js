(function (old) {
    $.fn.attr = function () {
        if (arguments.length === 0) {
            if (this.length === 0) {
                return null;
            }
            var obj = {};
            $.each(this[0].attributes, function () {
                if (this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }

        return old.apply(this, arguments);
    };
})($.fn.attr);
(function ($) {
    $(document).ready(function () {
        $(document).InputGurd('input[InputGurd],select[InputGurd],option[InputGurd],textarea[InputGurd]');
    });
    $.fn.InputGurd = function (xf) {
        var inputlist = [];
        var that = this;
        function init() {
            var x = $(that).find(xf != undefined ? xf : 'input,select,option,textarea');
            inputlist = [];
            for (var i = 0; i < x.length; i++) {
                var obj = $(x[i]);
                if (obj.attr('NoGurd') != undefined)
                    continue;
                var final = {};
                $.each(obj.attr(), function (index, element) {
                    index = index.toLowerCase();
                    if (index != 'style' && index != 'class' && !(index.startsWith('nt-'))) {
                        final[index] = element;
                    } else {
                        if (index.startsWith('nt-')) {
                            obj.attr(index.replace('nt-', ''), element);
                            obj.removeAttr(index);
                        }
                    }
                });
                obj.on('DOMNodeRemoved', function () {
                    location.reload();
                });
                //console.log(obj);
                final['object'] = obj;
                inputlist.push(final);
            }
        }
        init();
        this.bind('DOMNodeInserted DOMNodeRemoved', function () {
            init();
        });
        setInterval(function () {
            for (var i = 0; i < inputlist.length; i++) {
                var obj = inputlist[i];
                for (var item in obj) {
                    if (item != 'object') {
                        if (obj.object.attr(item) != obj[item]) {
                            obj.object.attr(item, obj[item]);
                        }
                    }
                }
            }
        }, 10);
        return this;
    };
})(jQuery);

