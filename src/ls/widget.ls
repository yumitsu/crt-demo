let $ = jQuery
  'use strict'

  class Widget
    valid: false
    root: null
    tree: null
    controls: {}
    treeData: []
    treeOptions:
      autoOpen: yes
      dragAndDrop: yes
      useContextMenu: false
      openedIcon: ''
    checkSelectors:
      '.selected-item'
      '.tree-elements'
      '.tree-elements > .controls > .search'
      '.tree-elements > .controls > .add'
      '.tree-elements > .list'

    (rootSelector, @treeData) ->
      @root = $ rootSelector

      if @treeData not instanceof Array
        @treeData = []

    run: !->
      @checkElementsPresense!

      if @valid is true
        @init!

    init: !->
      @initToggle!
      @initControls!
      @initTree!
      @initSearch!

    checkElementsPresense: !->
      notFound = no

      for sel in @checkSelectors
        if $ sel .length is 0
          notFound = yes
          break

      @valid = !notFound

    initToggle: !->
      @controls.toggle = $toggle = @root.children \.selected-item
      $toggle.click (e) !->
        e.preventDefault!
        $ @ .toggleClass \open

    initControls: !->
      $controls = @root.find \.controls
      [$searchBox, $search, $add] = [
        $controls.children \.search
        $controls.children \.search .children \input
        $controls.children \.add .children \a
      ]

      $searchBox.click (e) !->
        e.preventDefault!
        $search.focus!

      $search.focusin !->
        $searchBox.addClass \focused

      $search.focusout !->
        $searchBox.removeClass \focused

      $add.click (e) !~>
        e.preventDefault!
        @addTreeNode!

      [@controls.searchBox, @controls.search, @controls.add] = [$searchBox, $search, $add]

    initTree: !->
      @sortTreeData!

      $tree    = @root.children \.tree-elements .children \.list
      $options = @treeOptions with data: @treeData
      @tree    = $tree.tree $options

      /**
       * node select binding
      **/
      @tree.bind 'tree.select' (e) !~>
        if e.node?
          @selectNode e.node

    initSearch: !->
      return if @controls.length is 0
                or !@controls.search?
                or !@tree?

      let $input = @controls.search
        $input.keyup (e) !~>
          if e.which is 13 then e.preventDefault!
          @tree.find \.jqtree-element
               .css \opacity \.5
               .find ":contains('#{$input.val!}')"
               .parents!
               .css \opacity \1

    addTreeNode: ->
      $nodes = @tree.tree \getTree
      [$firstNode, $lastNode] = [$nodes.children[0], $nodes.children[$nodes.children.length-1]]

      @tree.tree \addNodeBefore {label: 'New item', id: $lastNode.id+1} $firstNode
      @tree.scrollTop 0

    sortTreeData: !->
      @treeData.sort (a, b) ->
        a.label.localeCompare b.label

    selectNode: (node) !->
      $toggle = @controls.toggle
      $toggle.text node.name
             .click!

  treeData$ =
    * label: 'яяя'
      id: 1
      children:
        * label: 'child1'
          id: 2
        * label: 'child2'
          id: 3
    * label: 'вввв'
      id: 4
      children:
        * label: 'child3'
          id: 5
        * label: 'child4'
          id: 6
    * label: 'аааа'
      id: 7
      children:
        * label: 'child5'
          id: 8
        * label: 'child6'
          id: 9
    * label: 'цццц'
      id: 10
      children:
        * label: 'child7'
          id: 11
        * label: 'child8'
          id: 12

  $ document .ready !->
    widget = new Widget 'main > .tree' treeData$
    widget.run!
