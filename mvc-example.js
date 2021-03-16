if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'mvc-example'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'mvc-example'.");
}this['mvc-example'] = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Unit = Kotlin.kotlin.Unit;
  var zipWithNext = Kotlin.kotlin.collections.zipWithNext_7wnvza$;
  var Triple = Kotlin.kotlin.Triple;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Comparator = Kotlin.kotlin.Comparator;
  var sortedWith = Kotlin.kotlin.collections.sortedWith_eknfly$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var addAll = Kotlin.kotlin.collections.addAll_ipc267$;
  var firstOrNull = Kotlin.kotlin.collections.firstOrNull_2p1efm$;
  var drop = Kotlin.kotlin.collections.drop_ba2ldo$;
  var math = Kotlin.kotlin.math;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  var Comparable = Kotlin.kotlin.Comparable;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var equals = Kotlin.equals;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  RedBlackTree$Node$Color.prototype = Object.create(Enum.prototype);
  RedBlackTree$Node$Color.prototype.constructor = RedBlackTree$Node$Color;
  var app;
  function addPoint(x, y) {
    app.addPoint_vux9f0$(x, y);
  }
  function movePoint(x1, y1, x2, y2) {
    app.movePoint_tjonv8$(x1, y1, x2, y2);
  }
  function removePoint(x, y) {
    app.removePoint_vux9f0$(x, y);
  }
  function intersects() {
    return app.intersects();
  }
  function App() {
    this.model_0 = new Model();
    this.view_0 = new View(this.model_0);
    this.controller_0 = new Controller(this.model_0, this.view_0);
  }
  App.prototype.addPoint_vux9f0$ = function (x, y) {
    this.model_0.addPoint_5lk9k0$(new Vec2D(x, y));
    this.model_0.checkSegmentIntersection();
  };
  App.prototype.movePoint_tjonv8$ = function (x1, y1, x2, y2) {
    var tmp$;
    var $receiver = this.model_0.points;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        if (element.x === x1 && element.y === y1) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }}
      firstOrNull$result = null;
    }
     while (false);
    if ((tmp$ = firstOrNull$result) != null) {
      tmp$.x = x2;
      tmp$.y = y2;
    }this.model_0.checkSegmentIntersection();
  };
  App.prototype.removePoint_vux9f0$ = function (x, y) {
    this.model_0.removePoint_5lk9k0$(new Vec2D(x, y));
    this.model_0.checkSegmentIntersection();
  };
  App.prototype.intersects = function () {
    return this.model_0.isSelfIntersecting;
  };
  App.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'App',
    interfaces: []
  };
  function Controller(model, view) {
    this.model_0 = model;
    this.view_0 = view;
    this.selected_0 = null;
    this.view_0.canvas.oncontextmenu = Controller_init$lambda(this);
    this.view_0.canvas.onmousedown = Controller_init$lambda_0(this);
    this.view_0.canvas.onmousemove = Controller_init$lambda_1(this);
    this.view_0.canvas.onmouseup = Controller_init$lambda_2(this);
    this.view_0.canvas.ondblclick = Controller_init$lambda_3(this);
  }
  Controller.prototype.onRightClick_0 = function (e) {
    var intersection = this.model_0.getIntersectionOrNull_n50e6m$(new Vec2D(e.clientX, e.clientY), View$Companion_getInstance().PIVOT_RADIUS);
    if (intersection != null) {
      this.model_0.removePoint_5lk9k0$(intersection);
      this.model_0.checkSegmentIntersection();
    }};
  Controller.prototype.onMouseDown_0 = function (e) {
    this.selected_0 = this.model_0.getIntersectionOrNull_n50e6m$(new Vec2D(e.clientX, e.clientY), View$Companion_getInstance().PIVOT_RADIUS);
  };
  Controller.prototype.onMouseMove_0 = function (e) {
    var tmp$, tmp$_0;
    (tmp$ = this.selected_0) != null ? (tmp$.x = e.clientX) : null;
    (tmp$_0 = this.selected_0) != null ? (tmp$_0.y = e.clientY) : null;
  };
  Controller.prototype.onMouseUp_0 = function (e) {
    this.selected_0 = null;
    this.model_0.checkSegmentIntersection();
  };
  Controller.prototype.onDoubleClick_0 = function (e) {
    this.model_0.addPoint_5lk9k0$(new Vec2D(e.clientX, e.clientY));
    this.model_0.checkSegmentIntersection();
  };
  function Controller_init$lambda(this$Controller) {
    return function (it) {
      this$Controller.onRightClick_0(it);
      it.preventDefault();
      return Unit;
    };
  }
  function Controller_init$lambda_0(this$Controller) {
    return function (it) {
      this$Controller.onMouseDown_0(it);
      return Unit;
    };
  }
  function Controller_init$lambda_1(this$Controller) {
    return function (it) {
      this$Controller.onMouseMove_0(it);
      return Unit;
    };
  }
  function Controller_init$lambda_2(this$Controller) {
    return function (it) {
      this$Controller.onMouseUp_0(it);
      return Unit;
    };
  }
  function Controller_init$lambda_3(this$Controller) {
    return function (it) {
      this$Controller.onDoubleClick_0(it);
      return Unit;
    };
  }
  Controller.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Controller',
    interfaces: []
  };
  function Model() {
    this._points_0 = ArrayList_init();
    this._selfIntersecting_0 = false;
  }
  Object.defineProperty(Model.prototype, 'points', {
    configurable: true,
    get: function () {
      return this._points_0;
    }
  });
  Object.defineProperty(Model.prototype, 'isSelfIntersecting', {
    configurable: true,
    get: function () {
      return this._selfIntersecting_0;
    }
  });
  Model.prototype.addPoint_5lk9k0$ = function (point) {
    this._points_0.add_11rb$(point);
  };
  Model.prototype.removePoint_5lk9k0$ = function (point) {
    this._points_0.remove_11rb$(point);
  };
  Model.prototype.getIntersectionOrNull_n50e6m$ = function (point, epsilon) {
    var tmp$;
    tmp$ = this._points_0.iterator();
    while (tmp$.hasNext()) {
      var p = tmp$.next();
      if (get_length(minus(point, p)) <= epsilon) {
        return p;
      }}
    return null;
  };
  Model.prototype.checkSegmentIntersection = function () {
    this._selfIntersecting_0 = this.hasSegmentIntersection_0();
  };
  Model.prototype.hasSegmentIntersection_0 = function () {
    var tmp$;
    var LEFT = 0;
    var endpoints = this.prepareEndpoints_0();
    var orderedSet = new OrderedSet();
    tmp$ = endpoints.iterator();
    while (tmp$.hasNext()) {
      var p = tmp$.next();
      var segment = p.third;
      if (p.second === LEFT) {
        orderedSet.insert_mef7kx$(segment);
        var above = orderedSet.aboveOrNull_mef7kx$(segment);
        var below = orderedSet.belowOrNull_mef7kx$(segment);
        if (above != null && intersectsWith(segment, above)) {
          return true;
        }if (below != null && intersectsWith(segment, below)) {
          return true;
        }} else {
        var above_0 = orderedSet.aboveOrNull_mef7kx$(segment);
        var below_0 = orderedSet.belowOrNull_mef7kx$(segment);
        if (above_0 != null && below_0 != null && intersectsWith(above_0, below_0)) {
          return true;
        }orderedSet.delete_mef7kx$(segment);
      }
    }
    return false;
  };
  function Model$prepareEndpoints$lambda(a, b) {
    if (a.first.x < b.first.x)
      return -1;
    else if (a.first.x > b.first.x)
      return 1;
    else if (a.first.y < b.first.y)
      return -1;
    else if (a.first.y > b.first.y)
      return 1;
    else if (a.second < b.second)
      return -1;
    else if (a.second > b.second)
      return 1;
    else
      return 0;
  }
  Model.prototype.prepareEndpoints_0 = function () {
    var LEFT = 0;
    var RIGHT = 1;
    var $receiver = zipWithNext(this._points_0);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0;
      if (element.first.x < element.second.x) {
        tmp$_0 = new Segment2D(element.first, element.second);
      } else {
        tmp$_0 = new Segment2D(element.second, element.first);
      }
      var segment = tmp$_0;
      var list = listOf([new Triple(segment.start, LEFT, segment), new Triple(segment.end, RIGHT, segment)]);
      addAll(destination, list);
    }
    var result = sortedWith(destination, new Comparator(Model$prepareEndpoints$lambda));
    return result;
  };
  Model.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Model',
    interfaces: []
  };
  function View(model) {
    View$Companion_getInstance();
    this.model_0 = model;
    var tmp$, tmp$_0;
    var $receiver = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    $receiver.width = window.innerWidth - 5 | 0;
    $receiver.height = window.innerHeight - 5 | 0;
    $receiver.style.backgroundColor = '#fff';
    this.canvas = $receiver;
    this.context_0 = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    window.onload = View_init$lambda(this);
  }
  function View$loop$lambda(this$View) {
    return function (it) {
      this$View.loop_0();
      return Unit;
    };
  }
  View.prototype.loop_0 = function () {
    this.draw_0();
    window.requestAnimationFrame(View$loop$lambda(this));
  };
  View.prototype.drawLines_0 = function () {
    var first = firstOrNull(this.model_0.points);
    var rest = drop(this.model_0.points, 1);
    if (first == null)
      return;
    var $receiver = this.context_0;
    var tmp$;
    $receiver.beginPath();
    $receiver.moveTo(first.x, first.y);
    tmp$ = rest.iterator();
    while (tmp$.hasNext()) {
      var p = tmp$.next();
      $receiver.lineTo(p.x, p.y);
    }
    $receiver.stroke();
  };
  View.prototype.drawPivots_0 = function () {
    var $receiver = this.context_0;
    var tmp$;
    $receiver.fillStyle = '#eee';
    tmp$ = this.model_0.points.iterator();
    while (tmp$.hasNext()) {
      var p = tmp$.next();
      $receiver.beginPath();
      $receiver.arc(p.x, p.y, View$Companion_getInstance().PIVOT_RADIUS, 0.0, 2 * math.PI);
      $receiver.fill();
      $receiver.stroke();
    }
  };
  View.prototype.drawCoordinates_0 = function () {
    var $receiver = this.context_0;
    var tmp$;
    $receiver.fillStyle = '#000';
    $receiver.font = '10pt sans-serif';
    tmp$ = this.model_0.points.iterator();
    while (tmp$.hasNext()) {
      var p = tmp$.next();
      var message = '(' + p.x + ', ' + p.y + ')';
      $receiver.fillText(message, p.x - message.length * 2.5, p.y - 20);
    }
  };
  View.prototype.drawInfo_0 = function () {
    var $receiver = this.context_0;
    var tmp$, tmp$_0;
    if (this.model_0.isSelfIntersecting) {
      tmp$ = '#006600';
    } else {
      tmp$ = '#000066';
    }
    $receiver.fillStyle = tmp$;
    $receiver.font = '12pt sans-serif';
    if (this.model_0.isSelfIntersecting) {
      tmp$_0 = 'Intersects';
    } else {
      tmp$_0 = 'Not intersects';
    }
    var message = tmp$_0;
    $receiver.fillText(message, 15.0, 25.0);
  };
  View.prototype.draw_0 = function () {
    this.clear_0();
    this.drawLines_0();
    this.drawPivots_0();
    this.drawCoordinates_0();
    this.drawInfo_0();
  };
  View.prototype.clear_0 = function () {
    this.context_0.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
  };
  function View$Companion() {
    View$Companion_instance = this;
    this.PIVOT_RADIUS = 7.5;
  }
  View$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var View$Companion_instance = null;
  function View$Companion_getInstance() {
    if (View$Companion_instance === null) {
      new View$Companion();
    }return View$Companion_instance;
  }
  function View_init$lambda$lambda(this$View) {
    return function (it) {
      this$View.loop_0();
      return Unit;
    };
  }
  function View_init$lambda(this$View) {
    return function (it) {
      var tmp$;
      (tmp$ = document.getElementsByTagName('body')[0]) != null ? tmp$.appendChild(this$View.canvas) : null;
      return window.requestAnimationFrame(View_init$lambda$lambda(this$View));
    };
  }
  View.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'View',
    interfaces: []
  };
  function Segment2D(start, end) {
    this.start = start;
    this.end = end;
  }
  Segment2D.prototype.compareTo_11rb$ = function (other) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    if (!((tmp$ = this.start) != null ? tmp$.equals(other.start) : null)) {
      tmp$_0 = minus(other.end, this.start);
    } else {
      tmp$_0 = minus(this.end, this.start);
    }
    var turnStart = tmp$_0;
    if (!((tmp$_1 = this.start) != null ? tmp$_1.equals(other.start) : null)) {
      tmp$_2 = minus(other.start, this.start);
    } else {
      tmp$_2 = minus(other.end, this.start);
    }
    var turnEnd = tmp$_2;
    var prod = cross(turnStart, turnEnd);
    if (prod > 0)
      tmp$_3 = -1;
    else if (prod < 0)
      tmp$_3 = 1;
    else
      tmp$_3 = 0;
    return tmp$_3;
  };
  Segment2D.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Segment2D',
    interfaces: [Comparable]
  };
  Segment2D.prototype.component1 = function () {
    return this.start;
  };
  Segment2D.prototype.component2 = function () {
    return this.end;
  };
  Segment2D.prototype.copy_w69gpg$ = function (start, end) {
    return new Segment2D(start === void 0 ? this.start : start, end === void 0 ? this.end : end);
  };
  Segment2D.prototype.toString = function () {
    return 'Segment2D(start=' + Kotlin.toString(this.start) + (', end=' + Kotlin.toString(this.end)) + ')';
  };
  Segment2D.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.start) | 0;
    result = result * 31 + Kotlin.hashCode(this.end) | 0;
    return result;
  };
  Segment2D.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.start, other.start) && Kotlin.equals(this.end, other.end)))));
  };
  function intersectsWith($receiver, other) {
    var tmp$;
    var d1 = direction(other.start, other.end, $receiver.start);
    var d2 = direction(other.start, other.end, $receiver.end);
    var d3 = direction($receiver.start, $receiver.end, other.start);
    var d4 = direction($receiver.start, $receiver.end, other.end);
    var dd1 = cross(minus($receiver.end, $receiver.start), minus(other.end, $receiver.start));
    var dd2 = cross(minus($receiver.end, $receiver.start), minus(other.start, other.end));
    var dd3 = cross(minus($receiver.start, $receiver.end), minus(other.end, other.start));
    var dd4 = cross(minus($receiver.start, $receiver.end), minus(other.start, $receiver.end));
    var tmp$_0;
    if (((tmp$_0 = $receiver.start) != null ? tmp$_0.equals(other.start) : null) && (dd1 !== 0 || !(hasPoint($receiver, other.end) || hasPoint(other, $receiver.end))))
      tmp$ = false;
    else {
      var tmp$_1;
      if (((tmp$_1 = $receiver.start) != null ? tmp$_1.equals(other.end) : null) && (dd2 !== 0 || !(hasPoint($receiver, other.start) || hasPoint(other, $receiver.end))))
        tmp$ = false;
      else {
        var tmp$_2;
        if (((tmp$_2 = $receiver.end) != null ? tmp$_2.equals(other.start) : null) && (dd3 !== 0 || !(hasPoint($receiver, other.end) || hasPoint(other, $receiver.start))))
          tmp$ = false;
        else {
          var tmp$_3;
          if (((tmp$_3 = $receiver.end) != null ? tmp$_3.equals(other.end) : null) && (dd4 !== 0 || !(hasPoint($receiver, other.start) || hasPoint(other, $receiver.start))))
            tmp$ = false;
          else if ((d1 > 0 && d2 < 0 || (d1 < 0 && d2 > 0)) && (d3 > 0 && d4 < 0 || (d3 < 0 && d4 > 0)))
            tmp$ = true;
          else if (d1 === 0 && hasPoint(other, $receiver.start))
            tmp$ = true;
          else if (d2 === 0 && hasPoint(other, $receiver.end))
            tmp$ = true;
          else if (d3 === 0 && hasPoint($receiver, other.start))
            tmp$ = true;
          else if (d4 === 0 && hasPoint($receiver, other.end))
            tmp$ = true;
          else
            tmp$ = false;
        }
      }
    }
    return tmp$;
  }
  function hasPoint($receiver, point) {
    var a = $receiver.start.x;
    var b = $receiver.end.x;
    var tmp$ = Math_0.min(a, b) <= point.x;
    if (tmp$) {
      var tmp$_0 = point.x;
      var a_0 = $receiver.start.x;
      var b_0 = $receiver.end.x;
      tmp$ = tmp$_0 <= Math_0.max(a_0, b_0);
    }var tmp$_1 = tmp$;
    if (tmp$_1) {
      var a_1 = $receiver.start.y;
      var b_1 = $receiver.end.y;
      tmp$_1 = Math_0.min(a_1, b_1) <= point.y;
    }var tmp$_2 = tmp$_1;
    if (tmp$_2) {
      var tmp$_3 = point.y;
      var a_2 = $receiver.start.y;
      var b_2 = $receiver.end.y;
      tmp$_2 = tmp$_3 <= Math_0.max(a_2, b_2);
    }if (tmp$_2) {
      return true;
    }return false;
  }
  function direction(x, y, z) {
    return cross(minus(z, x), minus(y, x));
  }
  function Vec2D(x, y) {
    if (x === void 0)
      x = 0;
    if (y === void 0)
      y = 0;
    this.x = x;
    this.y = y;
  }
  Vec2D.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vec2D',
    interfaces: []
  };
  Vec2D.prototype.component1 = function () {
    return this.x;
  };
  Vec2D.prototype.component2 = function () {
    return this.y;
  };
  Vec2D.prototype.copy_vux9f0$ = function (x, y) {
    return new Vec2D(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Vec2D.prototype.toString = function () {
    return 'Vec2D(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Vec2D.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Vec2D.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function plus($receiver, other) {
    return new Vec2D($receiver.x + other.x | 0, $receiver.y + other.y | 0);
  }
  function unaryMinus($receiver) {
    return new Vec2D(-$receiver.x | 0, -$receiver.y | 0);
  }
  function minus($receiver, other) {
    return plus($receiver, unaryMinus(other));
  }
  function times($receiver, scale) {
    return new Vec2D(Kotlin.imul($receiver.x, scale), Kotlin.imul($receiver.y, scale));
  }
  function cross($receiver, other) {
    return Kotlin.imul($receiver.x, other.y) - Kotlin.imul($receiver.y, other.x) | 0;
  }
  function dot($receiver, other) {
    return Kotlin.imul($receiver.x, other.x) + $receiver.y + other.y | 0;
  }
  function get_length($receiver) {
    var x = dot($receiver, $receiver);
    return Math_0.sqrt(x);
  }
  function OrderedSet() {
    this.container_0 = new RedBlackTree();
  }
  OrderedSet.prototype.insert_mef7kx$ = function (item) {
    this.container_0.insert_mef7kx$(item);
  };
  OrderedSet.prototype.delete_mef7kx$ = function (item) {
    this.container_0.remove_t2almk$(this.container_0.find_mef7kx$(item));
  };
  OrderedSet.prototype.aboveOrNull_mef7kx$ = function (item) {
    var tmp$;
    return (tmp$ = this.container_0.successorOf_t2almk$(this.container_0.find_mef7kx$(item))) != null ? tmp$.key : null;
  };
  OrderedSet.prototype.belowOrNull_mef7kx$ = function (item) {
    var tmp$;
    return (tmp$ = this.container_0.predecessorOf_t2almk$(this.container_0.find_mef7kx$(item))) != null ? tmp$.key : null;
  };
  OrderedSet.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'OrderedSet',
    interfaces: []
  };
  function RedBlackTree() {
    this.root_w9s85g$_0 = null;
  }
  function RedBlackTree$Node(key, parent, leftChild, rightChild, color) {
    if (parent === void 0)
      parent = null;
    if (leftChild === void 0)
      leftChild = null;
    if (rightChild === void 0)
      rightChild = null;
    if (color === void 0)
      color = RedBlackTree$Node$Color$RED_getInstance();
    this.key = key;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.color = color;
  }
  function RedBlackTree$Node$Color(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function RedBlackTree$Node$Color_initFields() {
    RedBlackTree$Node$Color_initFields = function () {
    };
    RedBlackTree$Node$Color$RED_instance = new RedBlackTree$Node$Color('RED', 0);
    RedBlackTree$Node$Color$BLACK_instance = new RedBlackTree$Node$Color('BLACK', 1);
  }
  var RedBlackTree$Node$Color$RED_instance;
  function RedBlackTree$Node$Color$RED_getInstance() {
    RedBlackTree$Node$Color_initFields();
    return RedBlackTree$Node$Color$RED_instance;
  }
  var RedBlackTree$Node$Color$BLACK_instance;
  function RedBlackTree$Node$Color$BLACK_getInstance() {
    RedBlackTree$Node$Color_initFields();
    return RedBlackTree$Node$Color$BLACK_instance;
  }
  RedBlackTree$Node$Color.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Color',
    interfaces: [Enum]
  };
  function RedBlackTree$Node$Color$values() {
    return [RedBlackTree$Node$Color$RED_getInstance(), RedBlackTree$Node$Color$BLACK_getInstance()];
  }
  RedBlackTree$Node$Color.values = RedBlackTree$Node$Color$values;
  function RedBlackTree$Node$Color$valueOf(name) {
    switch (name) {
      case 'RED':
        return RedBlackTree$Node$Color$RED_getInstance();
      case 'BLACK':
        return RedBlackTree$Node$Color$BLACK_getInstance();
      default:throwISE('No enum constant structures.RedBlackTree.Node.Color.' + name);
    }
  }
  RedBlackTree$Node$Color.valueOf_61zpoe$ = RedBlackTree$Node$Color$valueOf;
  RedBlackTree$Node.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Node',
    interfaces: []
  };
  RedBlackTree$Node.prototype.component1 = function () {
    return this.key;
  };
  RedBlackTree$Node.prototype.component2 = function () {
    return this.parent;
  };
  RedBlackTree$Node.prototype.component3 = function () {
    return this.leftChild;
  };
  RedBlackTree$Node.prototype.component4 = function () {
    return this.rightChild;
  };
  RedBlackTree$Node.prototype.component5 = function () {
    return this.color;
  };
  RedBlackTree$Node.prototype.copy_nhwne8$ = function (key, parent, leftChild, rightChild, color) {
    return new RedBlackTree$Node(key === void 0 ? this.key : key, parent === void 0 ? this.parent : parent, leftChild === void 0 ? this.leftChild : leftChild, rightChild === void 0 ? this.rightChild : rightChild, color === void 0 ? this.color : color);
  };
  RedBlackTree$Node.prototype.toString = function () {
    return 'Node(key=' + Kotlin.toString(this.key) + (', parent=' + Kotlin.toString(this.parent)) + (', leftChild=' + Kotlin.toString(this.leftChild)) + (', rightChild=' + Kotlin.toString(this.rightChild)) + (', color=' + Kotlin.toString(this.color)) + ')';
  };
  RedBlackTree$Node.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.key) | 0;
    result = result * 31 + Kotlin.hashCode(this.parent) | 0;
    result = result * 31 + Kotlin.hashCode(this.leftChild) | 0;
    result = result * 31 + Kotlin.hashCode(this.rightChild) | 0;
    result = result * 31 + Kotlin.hashCode(this.color) | 0;
    return result;
  };
  RedBlackTree$Node.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.key, other.key) && Kotlin.equals(this.parent, other.parent) && Kotlin.equals(this.leftChild, other.leftChild) && Kotlin.equals(this.rightChild, other.rightChild) && Kotlin.equals(this.color, other.color)))));
  };
  Object.defineProperty(RedBlackTree.prototype, 'root', {
    configurable: true,
    get: function () {
      return this.root_w9s85g$_0;
    },
    set: function (root) {
      this.root_w9s85g$_0 = root;
    }
  });
  RedBlackTree.prototype.findGrandparent_0 = function ($receiver) {
    if ($receiver == null)
      return null;
    if ($receiver.parent == null)
      return null;
    return ensureNotNull($receiver.parent).parent;
  };
  RedBlackTree.prototype.findUncle_0 = function ($receiver) {
    var grandpa = this.findGrandparent_0($receiver);
    if (grandpa == null)
      return null;
    var requireNotNull$result;
    if ($receiver == null) {
      var message = 'Required value was null.';
      throw IllegalArgumentException_init(message.toString());
    } else {
      requireNotNull$result = $receiver;
    }
    if (equals($receiver.parent, grandpa.leftChild)) {
      return grandpa.rightChild;
    }return grandpa.leftChild;
  };
  RedBlackTree.prototype.findSibling_0 = function ($receiver, parent) {
    if (parent == null)
      return null;
    if (equals($receiver, parent.leftChild))
      return parent.rightChild;
    return parent.leftChild;
  };
  RedBlackTree.prototype.get_isRed_0 = function ($receiver) {
    return $receiver == null ? false : $receiver.color === RedBlackTree$Node$Color$RED_getInstance();
  };
  RedBlackTree.prototype.leftRotate_0 = function (x) {
    if (x == null)
      return;
    if (x.rightChild == null)
      return;
    var y = x.rightChild;
    x.rightChild = ensureNotNull(y).leftChild;
    if (y.leftChild != null) {
      ensureNotNull(y.leftChild).parent = x;
    }y.parent = x.parent;
    if (x.parent == null) {
      this.root = y;
    } else {
      if (equals(x, ensureNotNull(x.parent).leftChild)) {
        ensureNotNull(x.parent).leftChild = y;
      } else {
        ensureNotNull(x.parent).rightChild = y;
      }
    }
    y.leftChild = x;
    x.parent = y;
  };
  RedBlackTree.prototype.rightRotate_0 = function (x) {
    if (x == null)
      return;
    if (x.leftChild == null)
      return;
    var y = x.leftChild;
    x.leftChild = ensureNotNull(y).rightChild;
    if (y.rightChild != null) {
      ensureNotNull(y.rightChild).parent = x;
    }y.parent = x.parent;
    if (x.parent == null) {
      this.root = y;
    } else {
      if (equals(x, ensureNotNull(x.parent).leftChild)) {
        ensureNotNull(x.parent).leftChild = y;
      } else {
        ensureNotNull(x.parent).rightChild = y;
      }
    }
    y.rightChild = x;
    x.parent = y;
  };
  RedBlackTree.prototype.insert_mef7kx$ = function (item) {
    var tmp$;
    var current = this.root;
    var previous = null;
    while (current != null) {
      previous = current;
      if (Kotlin.compareTo(item, current.key) < 0) {
        tmp$ = current.leftChild;
      } else {
        tmp$ = current.rightChild;
      }
      current = tmp$;
    }
    var inserting = new RedBlackTree$Node(item, previous);
    if (previous == null) {
      this.root = inserting;
    } else {
      if (Kotlin.compareTo(item, previous.key) < 0) {
        previous.leftChild = inserting;
      } else {
        previous.rightChild = inserting;
      }
    }
    this.insertFixup_0(inserting);
  };
  RedBlackTree.prototype.insertFixup_0 = function (node) {
    this.insertCaseNo1_0(node);
  };
  RedBlackTree.prototype.insertCaseNo1_0 = function (z) {
    if (z == null)
      return;
    if (z.parent == null) {
      z.color = RedBlackTree$Node$Color$BLACK_getInstance();
    } else {
      this.insertCaseNo2_0(z);
    }
  };
  RedBlackTree.prototype.insertCaseNo2_0 = function (z) {
    if (ensureNotNull(z.parent).color === RedBlackTree$Node$Color$BLACK_getInstance()) {
      return;
    } else {
      this.insertCaseNo3_0(z);
    }
  };
  RedBlackTree.prototype.insertCaseNo3_0 = function (z) {
    var u = this.findUncle_0(z);
    if (this.get_isRed_0(u)) {
      ensureNotNull(z.parent).color = RedBlackTree$Node$Color$BLACK_getInstance();
      ensureNotNull(u).color = RedBlackTree$Node$Color$BLACK_getInstance();
      var g = this.findGrandparent_0(z);
      ensureNotNull(g).color = RedBlackTree$Node$Color$RED_getInstance();
      this.insertCaseNo1_0(g);
    } else {
      this.insertCaseNo4_0(z);
    }
  };
  RedBlackTree.prototype.insertCaseNo4_0 = function (node) {
    var z = node;
    var g = this.findGrandparent_0(z);
    if (equals(z, ensureNotNull(ensureNotNull(z).parent).rightChild) && equals(z.parent, ensureNotNull(g).leftChild)) {
      this.leftRotate_0(z.parent);
      z = z.leftChild;
    } else if (equals(z, ensureNotNull(z.parent).leftChild) && equals(z.parent, ensureNotNull(g).rightChild)) {
      this.rightRotate_0(z.parent);
      z = z.rightChild;
    }this.insertCaseNo5_0(z);
  };
  RedBlackTree.prototype.insertCaseNo5_0 = function (z) {
    var g = this.findGrandparent_0(z);
    ensureNotNull(ensureNotNull(z).parent).color = RedBlackTree$Node$Color$BLACK_getInstance();
    ensureNotNull(g).color = RedBlackTree$Node$Color$RED_getInstance();
    if (equals(z, ensureNotNull(z.parent).leftChild) && equals(z.parent, g.leftChild)) {
      this.rightRotate_0(g);
    } else {
      this.leftRotate_0(g);
    }
  };
  RedBlackTree.prototype.remove_t2almk$ = function (current) {
    var tmp$, tmp$_0;
    if (current == null)
      return current;
    if (current.leftChild == null || current.rightChild == null) {
      tmp$ = current;
    } else {
      tmp$ = this.successorOf_t2almk$(current);
    }
    var removable = tmp$;
    var child = null;
    if (removable != null) {
      if (removable.leftChild != null) {
        tmp$_0 = removable.leftChild;
      } else {
        tmp$_0 = removable.rightChild;
      }
      child = tmp$_0;
    }if (child != null) {
      child.parent = removable != null ? removable.parent : null;
    }if ((removable != null ? removable.parent : null) == null) {
      this.root = child;
    } else {
      if (equals(removable, ensureNotNull(removable.parent).leftChild)) {
        ensureNotNull(removable.parent).leftChild = child;
      } else {
        ensureNotNull(removable.parent).rightChild = child;
      }
    }
    if (!equals(removable, current)) {
      if (removable != null) {
        current.key = removable.key;
      }}if (removable != null && removable.color === RedBlackTree$Node$Color$BLACK_getInstance()) {
      if (this.get_isRed_0(child)) {
        ensureNotNull(child).color = RedBlackTree$Node$Color$BLACK_getInstance();
      } else {
        this.removeFixup_0(child, child != null ? child.parent : null);
      }
    }if (removable != null) {
      removable.leftChild = null;
      removable.rightChild = null;
    }return removable;
  };
  RedBlackTree.prototype.removeFixup_0 = function (x, parent) {
    if (parent === void 0)
      parent = null;
    this.removeCaseNo1_0(x, parent);
  };
  RedBlackTree.prototype.removeCaseNo1_0 = function (z, parent) {
    if (parent != null) {
      this.removeCaseNo2_0(z, parent);
    }};
  RedBlackTree.prototype.removeCaseNo2_0 = function (z, parent) {
    var s = this.findSibling_0(z, parent);
    if (this.get_isRed_0(s)) {
      parent.color = RedBlackTree$Node$Color$RED_getInstance();
      ensureNotNull(s).color = RedBlackTree$Node$Color$BLACK_getInstance();
      if (equals(z, parent.leftChild)) {
        this.leftRotate_0(parent);
      } else {
        this.rightRotate_0(parent);
      }
    }this.removeCaseNo3_0(z, parent);
  };
  RedBlackTree.prototype.removeCaseNo3_0 = function (z, parent) {
    var s = this.findSibling_0(z, parent);
    if (!this.get_isRed_0(parent) && s != null && s.color === RedBlackTree$Node$Color$BLACK_getInstance() && !this.get_isRed_0(s.leftChild) && !this.get_isRed_0(s.rightChild)) {
      s.color = RedBlackTree$Node$Color$RED_getInstance();
      this.removeCaseNo1_0(parent, parent.parent);
    } else {
      this.removeCaseNo4_0(z, parent);
    }
  };
  RedBlackTree.prototype.removeCaseNo4_0 = function (z, parent) {
    var s = this.findSibling_0(z, parent);
    if (this.get_isRed_0(parent) && s != null && s.color === RedBlackTree$Node$Color$BLACK_getInstance() && !this.get_isRed_0(s.leftChild) && !this.get_isRed_0(s.rightChild)) {
      s.color = RedBlackTree$Node$Color$RED_getInstance();
      parent.color = RedBlackTree$Node$Color$BLACK_getInstance();
    } else {
      this.removeCaseNo5_0(z, parent);
    }
  };
  RedBlackTree.prototype.removeCaseNo5_0 = function (z, parent) {
    var s = this.findSibling_0(z, parent);
    if (s != null && s.color === RedBlackTree$Node$Color$BLACK_getInstance()) {
      if (equals(z, parent.leftChild) && !this.get_isRed_0(s.rightChild) && this.get_isRed_0(s.leftChild)) {
        s.color = RedBlackTree$Node$Color$RED_getInstance();
        ensureNotNull(s.leftChild).color = RedBlackTree$Node$Color$BLACK_getInstance();
        this.rightRotate_0(s);
      } else if (equals(z, parent.rightChild) && !this.get_isRed_0(s.leftChild) && this.get_isRed_0(s.rightChild)) {
        s.color = RedBlackTree$Node$Color$RED_getInstance();
        ensureNotNull(s.rightChild).color = RedBlackTree$Node$Color$BLACK_getInstance();
        this.leftRotate_0(s);
      }}this.removeCaseNo6_0(z, parent);
  };
  RedBlackTree.prototype.removeCaseNo6_0 = function (z, parent) {
    var s = this.findSibling_0(z, parent);
    if (s != null) {
      s.color = parent.color;
      parent.color = RedBlackTree$Node$Color$BLACK_getInstance();
      if (equals(z, parent.leftChild)) {
        ensureNotNull(s.rightChild).color = RedBlackTree$Node$Color$BLACK_getInstance();
        this.leftRotate_0(parent);
      } else {
        ensureNotNull(s.rightChild).color = RedBlackTree$Node$Color$BLACK_getInstance();
        this.rightRotate_0(parent);
      }
    }};
  RedBlackTree.prototype.minimum_t2almk$ = function (node) {
    if (node === void 0)
      node = this.root;
    if (node == null)
      return node;
    var current = node;
    while (ensureNotNull(current).leftChild != null) {
      current = current.leftChild;
    }
    return current;
  };
  RedBlackTree.prototype.maximum_t2almk$ = function (node) {
    if (node === void 0)
      node = this.root;
    if (node == null)
      return node;
    var current = node;
    while (ensureNotNull(current).rightChild != null) {
      current = current.rightChild;
    }
    return current;
  };
  RedBlackTree.prototype.predecessorOf_t2almk$ = function (node) {
    if (node == null)
      return node;
    if (node.leftChild != null) {
      return this.maximum_t2almk$(node.leftChild);
    }var current = node;
    var upward = current.parent;
    while (upward != null && equals(current, upward.leftChild)) {
      current = upward;
      upward = current.parent;
    }
    return upward;
  };
  RedBlackTree.prototype.successorOf_t2almk$ = function (node) {
    if (node == null)
      return node;
    if (node.rightChild != null) {
      return this.minimum_t2almk$(node.rightChild);
    }var current = node;
    var upward = current.parent;
    while (upward != null && equals(current, upward.rightChild)) {
      current = upward;
      upward = current.parent;
    }
    return upward;
  };
  RedBlackTree.prototype.find_mef7kx$ = function (key) {
    var tmp$;
    var current = this.root;
    while (true) {
      if (current == null)
        return current;
      if (equals(current.key, key))
        return current;
      if (Kotlin.compareTo(key, current.key) < 0) {
        tmp$ = current.leftChild;
      } else {
        tmp$ = current.rightChild;
      }
      current = tmp$;
    }
  };
  RedBlackTree.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RedBlackTree',
    interfaces: []
  };
  Object.defineProperty(_, 'app_8be2vx$', {
    get: function () {
      return app;
    }
  });
  _.addPoint = addPoint;
  _.movePoint = movePoint;
  _.removePoint = removePoint;
  _.intersects = intersects;
  var package$app = _.app || (_.app = {});
  package$app.App = App;
  package$app.Controller = Controller;
  package$app.Model = Model;
  Object.defineProperty(View, 'Companion', {
    get: View$Companion_getInstance
  });
  package$app.View = View;
  var package$math = _.math || (_.math = {});
  package$math.Segment2D = Segment2D;
  package$math.intersectsWith_jj64nj$ = intersectsWith;
  package$math.hasPoint_20qngt$ = hasPoint;
  package$math.direction_xk1gxv$ = direction;
  package$math.Vec2D = Vec2D;
  package$math.plus_kqdxm7$ = plus;
  package$math.unaryMinus_vi84b3$ = unaryMinus;
  package$math.minus_kqdxm7$ = minus;
  package$math.times_k59xn3$ = times;
  package$math.cross_kqdxm7$ = cross;
  package$math.dot_kqdxm7$ = dot;
  package$math.get_length_vi84b3$ = get_length;
  var package$structures = _.structures || (_.structures = {});
  package$structures.OrderedSet = OrderedSet;
  Object.defineProperty(RedBlackTree$Node$Color, 'RED', {
    get: RedBlackTree$Node$Color$RED_getInstance
  });
  Object.defineProperty(RedBlackTree$Node$Color, 'BLACK', {
    get: RedBlackTree$Node$Color$BLACK_getInstance
  });
  RedBlackTree$Node.Color = RedBlackTree$Node$Color;
  RedBlackTree.Node = RedBlackTree$Node;
  package$structures.RedBlackTree = RedBlackTree;
  app = new App();
  Kotlin.defineModule('mvc-example', _);
  return _;
}(typeof this['mvc-example'] === 'undefined' ? {} : this['mvc-example'], kotlin);
