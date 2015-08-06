;(function ($) {
    'use strict';

    var treeData = [
        {
            label: 'node1', id: 1,
            children: [
                { label: 'child1', id: 2 },
                { label: 'child2', id: 3 }
            ]
        },
        {
            label: 'node2', id: 4,
            children: [
                { label: 'child3', id: 5 }
            ]
        },
        {
            label: 'node3', id: 6,
            children: [
                { label: 'child4', id: 7 }
            ]
        },
        {
            label: 'node4', id: 8,
            children: [
                { label: 'child5', id: 9 }
            ]
        },
        {
            label: 'node5', id: 10,
            children: [
                { label: 'child6', id: 11 }
            ]
        }
    ];

    var TreeSearch = {
        input: null,
        tree: null,

        init: function (input, tree) {
            this.input = $(input);
            this.tree = $(tree);

            this.bindEventListeners();
        },

        bindEventListeners: function () {
            var this$ = this;

            this.input.keyup(function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                }

                this$.tree
                    .find('.jqtree-element')
                    .css('opacity', '.5')
                    .find(':contains("'+$(this).val()+'")')
                    .parents()
                    .css('opacity', '1');
            });
        }
    };

    var Tree = {
        tree: null,
        treeOptions: {
            autoOpen: true,
            dragAndDrop: true,
            openedIcon: '',
            useContextMenu: false
        },

        init: function (selector, data) {
            this.treeOptions = $.extend({}, this.treeOptions, {data: data});
            this.tree = $(selector).tree(this.treeOptions);

            return this.tree;
        },

        addElement: function () {}
    };

    window.Tree = Tree;

    $(document).ready(function () {
        $('.selected-item').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });

        $('.tree-elements .controls .search').on('click', function (e) {
            e.preventDefault();
            $(this).children('input').focus();
        });

        $('.tree-elements .controls .search > input').focusin(function() {
            $(this).parent().addClass('focused');
        });

        $('.tree-elements .controls .search > input').focusout(function() {
            $(this).parent().removeClass('focused');
        });

        var tree = Tree.init('.tree-elements .list', treeData);
        TreeSearch.init('.tree-elements .controls .search > input', tree);
    });
})(jQuery);
