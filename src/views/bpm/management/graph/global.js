'use strict'
import lodash_1 from 'lodash'
import chroma_js_1 from 'chroma-js' 
// var lodash_1 = require('lodash')
// var chroma_js_1 = require('chroma-js')
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected(value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1] }, trys: [], ops: [] }; var f; var y; var t; var g
  return g = { next: verb(0), 'throw': verb(1), 'return': verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this }), g
  function verb(n) { return function(v) { return step([n, v]) } }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
        if (y = 0, t) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0: case 1: t = op; break
          case 4: _.label++; return { value: op[1], done: false }
          case 5: _.label++; y = op[1]; op = [0]; continue
          case 7: op = _.ops.pop(); _.trys.pop(); continue
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break }
            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break }
            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break }
            if (t[2]) _.ops.pop()
            _.trys.pop(); continue
        }
        op = body.call(thisArg, _)
      } catch (e) { op = [6, e]; y = 0 } finally { f = t = 0 }
    }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true }
  }
}
var __spreadArrays = (this && this.__spreadArrays) || function() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) { r[k] = a[j] }
  }
  return r
}
//exports.__esModule = true
var GFCONSTANT = /** @class */ (function() {
  function GFCONSTANT() {
    // CONFIG
    this.CONF_PATH_LIBS = 'libs/'
    this.CONF_PATH_DRAWIO = 'libs/drawio/'
    this.CONF_PATH_STATIC = 'static/'
    this.CONF_PATH_PARTIALS = 'partials/'
    this.CONF_PATH_STYLES = 'styles/'
    this.CONF_FILE_DEFAULTDIO = 'static/defaultGraph.drawio'
    this.CONF_FILE_DEFAULTCSV = 'static/defaultGraph.csv'
    this.CONF_FILE_SHAPESTXT = 'static/shapes.txt'
    this.CONF_FILE_APPJS = 'libs/drawio/js/app.min.js'
    this.CONF_FILE_SHAPESJS = 'libs/drawio/js/shapes.min.js'
    // CONF_FILE_VIEWERJS = 'libs/drawio/js/viewer.min.js';
    this.CONF_FILE_VIEWERJS = 'libs/drawio/js/viewer-static.min.js'
    this.CONF_FILE_PRECONFIGJS = 'libs/drawio/js/PreConfig.js'
    this.CONF_FILE_POSTCONFIGJS = 'libs/drawio/js/PostConfig.js'
    this.CONF_TOOLTIPS_DELAY = 200
    this.CONF_GRAPHHOVER_DELAY = 50
    this.CONF_COLORS_STEPS = 5
    this.CONF_COLORS_MS = 50
    this.CONF_ANIMS_STEP = 5
    this.CONF_ANIMS_MS = 50
    this.CONF_GFMESSAGE_MS = 5000
    this.CONF_BLINK_COLOR = '#f5f242'
    this.CONF_HIGHTLIGHT_COLOR = '#99ff33'
    // GLOBAL VARIABLE
    this.VAR_STG_SHAPES = 'shapestext'
    this.VAR_TBL_SHAPES = 'shapesarray'
    this.VAR_STR_VIEWERJS = 'viewer.min.js'
    this.VAR_STR_SHAPESJS = 'shapes.min.js'
    this.VAR_STG_CTXROOT = 'contextroot'
    this.VAR_NUM_GHTIMESTAMP = 'graph-hover-timestamp'
    this.VAR_OBJ_TEMPLATESRV = 'templatesrv'
    // VAR_OBJ_CTRL = 'ctrl';
    // VAR_OBJ_SCOPE = 'scope';
    this.VAR_OBJ_DASHBOARD = 'board'
    this.VAR_MAP_INTERVAL = 'interval'
    this.VAR_MAP_TIMEOUT = 'timeout'
    this.VAR_STR_RULENAME = '_rule'
    this.VAR_NUM_LEVEL = '_level'
    this.VAR_NUM_VALUE = '_value'
    this.VAR_STR_FORMATED = '_formated'
    this.VAR_STR_COLOR = '_color'
    this.VAR_STR_DATE = '_date'
    this.VAR_STR_METRIC = '_metric'
    // FLOWCHART CHANGE KEY FLAG
    this.FLOWCHART_CHG_SOURCES = 'sources'
    this.FLOWCHART_CHG_OPTIONS = 'options'
    this.FLOWCHART_APL_OPTIONS = 'applyOptions'
    this.FLOWCHART_CHG_DATAS = 'datas'
    this.FLOWCHART_CHG_RULES = 'rules'
    this.FLOWCHART_CHG_GRAPHHOVER = 'graphHover'
    this.FLOWCHART_CHG_HIDDENCHANGE = 'hiddenChange'
    // TRACE AND DEBUG
    this.VAR_GF_TRACE_PERF = true
    // MXGRAPH
    this.MXGRAPH_STYLES_COLOR = [
      'fillColor',
      'strokeColor',
      'gradientColor',
      'fontColor',
      'labelBackgroundColor',
      'labelBorderColor',
      'imageBorder',
      'imageBackground'
    ]
    this.MXGRAPH_STYLES_EVENT_ANIM = [
      'barPos',
      'gaugePos',
      'fontSize',
      'opacity',
      'textOpacity',
      'rotation'
    ]
    this.MXGRAPH_STYLES_EVENT_STATIC = [
      'shape',
      'endArrow',
      'startArrow',
      'flipH',
      'flipV',
      'gradientDirection',
      'image'
    ]
    this.MXGRAPH_STYLES_EVENT = __spreadArrays(this.MXGRAPH_STYLES_EVENT_ANIM, this.MXGRAPH_STYLES_EVENT_STATIC)
    this.MXGRAPH_STYLES_ANIM = __spreadArrays(this.MXGRAPH_STYLES_COLOR, this.MXGRAPH_STYLES_EVENT_ANIM)
    this.MXGRAPH_STYLES_STATIC = __spreadArrays(this.MXGRAPH_STYLES_EVENT_STATIC)
    this.MXGRAPH_STYLES = __spreadArrays(this.MXGRAPH_STYLES_ANIM, this.MXGRAPH_STYLES_STATIC)
    // COMPARATORS
    this.COMP_LT = 'lt'
    this.COMP_LE = 'le'
    this.COMP_EQ = 'eq'
    this.COMP_NE = 'ne'
    this.COMP_GE = 'ge'
    this.COMP_GT = 'gt'
    this.COMP_AL = 'al'
    // CONDITIONS
    this.TOOLTIP_APPLYON = [
      { text: 'Warning / Critical', value: 'wc' },
      { text: 'Always', value: 'a' }
    ]
    this.COLOR_APPLYON = [
      { text: 'Never', value: 'n' },
      { text: 'Warning / Critical', value: 'wc' },
      { text: 'Always', value: 'a' }
    ]
    this.TEXT_APPLYON = [
      { text: 'Never', value: 'n' },
      { text: 'When Metric Displayed', value: 'wmd' },
      { text: 'Warning / Critical', value: 'wc' },
      { text: 'Critical Only', value: 'co' }
    ]
    this.LINK_APPLYON = [
      { text: 'Warning / Critical', value: 'wc' },
      { text: 'Always', value: 'a' }
    ]
    // TYPES
    this.VALUE_TYPES = [
      { text: 'Number', value: 'number' },
      { text: 'String', value: 'string' },
      { text: 'Date', value: 'date' }
    ]
    this.METRIC_TYPES = [
      { text: 'Series', value: 'serie' },
      { text: 'Table', value: 'table' }
    ]
    this.SOURCE_TYPES = [
      { text: 'XML', value: 'xml' },
      { text: 'CSV', value: 'csv' }
    ]
    this.DIOTHEME_TYPES = [
      { text: 'Dark', value: 'dark' },
      { text: 'Light', value: 'kennedy' },
      { text: 'Mobile', value: 'minimal' },
      { text: 'atlas', value: 'atlas' }
    ]
    this.IDENT_TYPES = [
      { text: 'Id', value: 'id' },
      { text: 'Label', value: 'value' },
      { text: 'Metadata', value: 'metadata' }
    ]
    this.AGGREGATION_TYPES = [
      { text: 'First', value: 'first' },
      { text: 'First (not null)', value: 'first_notnull' },
      { text: 'Last', value: 'current' },
      { text: 'Last (not null)', value: 'current_notnull' },
      { text: 'Min', value: 'min' },
      { text: 'Max', value: 'max' },
      { text: 'Sum', value: 'total' },
      { text: 'Avg', value: 'avg' },
      { text: 'Count', value: 'count' },
      { text: 'Delta', value: 'delta' },
      { text: 'Range', value: 'range' },
      { text: 'Diff', value: 'diff' },
      { text: 'Time of last point', value: 'last_time' }
    ]
    this.TOOLTIP_GRAPH_TYPES = [
      { text: 'Line', value: 'line' },
      { text: 'Histogram', value: 'bar' }
    ]
    this.TOOLTIP_GRAPH_SCALE_TYPES = [
      { text: 'Linear', value: 'linear' },
      { text: 'Logarithmic', value: 'log' }
    ]
    this.TOOLTIP_GRAPH_SIZE_TYPES = [
      { text: 'Adjustable', value: '100%' },
      { text: 'Small', value: '100px' },
      { text: 'Medium', value: '200px' },
      { text: 'Large', value: '400px' }
    ]
    this.TOOLTIP_DIRECTION_TYPES = [
      { text: 'Vertical', value: 'v' },
      { text: 'Horizontal ', value: 'h' }
    ]
    this.COMPARATOR_TYPES = [
      { text: 'Always', value: 'al' },
      { text: 'Less than', value: 'lt' },
      { text: 'Less than or equal to', value: 'le' },
      { text: 'Equal to', value: 'eq' },
      { text: 'Not equal to', value: 'ne' },
      { text: 'Greater than or equal to', value: 'ge' },
      { text: 'Greater than ', value: 'gt' }
    ]
    this.VALUE_DATEFORMAT_TYPES = [
      { text: 'YYYY-MM-DD HH:mm:ss', value: 'YYYY-MM-DD HH:mm:ss' },
      { text: 'YYYY-MM-DD HH:mm:ss.SSS', value: 'YYYY-MM-DD HH:mm:ss.SSS' },
      { text: 'MM/DD/YY h:mm:ss a', value: 'MM/DD/YY h:mm:ss a' },
      { text: 'MMMM D, YYYY LT', value: 'MMMM D, YYYY LT' },
      { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
    ]
    this.VALUEMAPPINGTYPES = [
      { text: 'Value to text', value: 1 },
      { text: 'Range to text', value: 2 }
    ]
    // METHODS
    this.TEXTMETHODS = [
      { text: 'All content', value: 'content' },
      { text: 'Substring', value: 'pattern', placeholder: '/RegEx/' },
      { text: 'Append (Space) ', value: 'as' },
      { text: 'Append (New line) ', value: 'anl' }
    ]
    this.COLORMETHODS = [
      { text: 'Shape Stroke/Border', value: 'strokeColor' },
      { text: 'Shape Fill', value: 'fillColor' },
      { text: 'Shape Gradient', value: 'gradientColor' },
      { text: 'Label font color', value: 'fontColor' },
      { text: 'Label background color', value: 'labelBackgroundColor' },
      { text: 'Label border color', value: 'labelBorderColor' },
      { text: 'Image background', value: 'imageBackground' },
      { text: 'Image border', value: 'imageBorder' }
    ]
    this.EVENTMETHODS = [
      { text: 'Shape : Change form (text)', value: 'shape', type: 'text', placeholder: 'Shape name' },
      { text: 'Shape : Rotate Shape (0-360)', value: 'rotation', type: 'number', placeholder: '0-360', 'default': 0 },
      { text: 'Shape : Blink (frequence ms)', value: 'blink', type: 'number', placeholder: 'Number in ms', 'default': 500 },
      { text: 'Shape : Hide/Show (0|1)', value: 'visibility', type: 'number', placeholder: '0 or 1', typeahead: '0|1' },
      { text: 'Shape : Height (number)', value: 'height', type: 'number', placeholder: 'Number of px' },
      { text: 'Shape : Width (number)', value: 'width', type: 'number', placeholder: 'Number of px' },
      { text: 'Shape : Resize (percent)', value: 'size', type: 'number', placeholder: 'percent' },
      { text: 'Shape : Opacity (0-100)', value: 'opacity', type: 'number', placeholder: '0-100', 'default': 100 },
      {
        text: 'Shape : Gradient direction',
        value: 'gradientDirection',
        type: 'text',
        placeholder: 'Direction name',
        'default': 'south',
        typeahead: 'south|east|north|west'
      },
      {
        text: 'Shape : Collapse/Expande (0|1)',
        value: 'fold',
        type: 'number',
        placeholder: '0 or 1',
        typeahead: '0|1',
        'default': '1'
      },
      { text: 'Shape : Change position in Bar (0-100)', value: 'barPos', type: 'number', placeholder: '0-100' },
      { text: 'Shape : Change position in Gauge (0-100)', value: 'gaugePos', type: 'number', placeholder: '0-100' },
      {
        text: 'Shape : Flip horizontally (0|1)',
        value: 'flipH',
        type: 'number',
        placeholder: '0 or 1',
        typeahead: '0|1'
      },
      { text: 'Shape : Flip vertically (0|1)', value: 'flipV', type: 'number', placeholder: '0 or 1', typeahead: '0|1' },
      {
        text: 'Arrow : change start marker (text)',
        value: 'startArrow',
        type: 'text',
        placeholder: 'Marker',
        typeahead: 'none|classic|classicThin|block|blockThin|open|openThin|oval|diamond|diamondThin|openAsync|async|box|halfCircle|dash|cross|circlePlus|circle|ERone|ERmandOne|ERoneToMany|ERzeroToOne'
      },
      {
        text: 'Arrow : change end marker (text)',
        value: 'endArrow',
        type: 'text',
        placeholder: 'Marker',
        typeahead: 'none|classic|classicThin|block|blockThin|open|openThin|oval|diamond|diamondThin|openAsync|async|box|halfCircle|dash|cross|circlePlus|circle|ERone|ERmandOne|ERoneToMany|ERzeroToOne'
      },
      {
        text: 'Arrow : Anime flow (frequence ms)',
        value: 'class_mxEdgeFlow',
        type: 'number',
        placeholder: 'Number in ms'
      },
      { text: 'Label : Replace text (text)', value: 'text', type: 'text', placeholder: 'Text' },
      { text: 'Label : Font Size (numeric)', value: 'fontSize', type: 'number', placeholder: 'Number' },
      { text: 'Label : Opacity (numeric)', value: 'textOpacity', type: 'number', placeholder: '0-100', 'default': 100 },
      { text: 'Image : Change URL (text)', value: 'image', type: 'text', placeholder: 'Url' },
      { text: 'Tooltip : Add/Change tooltip text', value: 'tpText', type: 'text', placeholder: 'text' },
      {
        text: 'Tooltip : Add/Change metadata key and value',
        value: 'tpMetadata',
        type: 'text',
        placeholder: 'key@value'
      }
    ]
    this.LOCALVARIABLENAMES = [
      { text: 'Name of the rule', value: this.VAR_STR_RULENAME },
      { text: 'Current date', value: this.VAR_STR_DATE },
      { text: 'Current color according to the thresholds', value: this.VAR_STR_COLOR },
      { text: 'Current raw value according to the aggregation', value: this.VAR_NUM_VALUE },
      { text: 'Current level according to the thresholds', value: this.VAR_NUM_LEVEL },
      { text: 'Current formated value accordingto the type', value: this.VAR_STR_FORMATED }
    ]
  }
  return GFCONSTANT
}())
var GFVariables = /** @class */ (function() {
  function GFVariables() {
    this._variables = new Map()
  }
  /**
     * Get the full available vars names
     *
     * @static
     * @returns {string[]}
     * @memberof GFVariables
     */
  GFVariables.getAvailableLocalVarNames = function() {
    return $GF.CONSTANTS.LOCALVARIABLENAMES.map(function(x) { return '${' + x.value + '}' })
  }
  /**
     * set or redefine varaible
     *
     * @param {string} key
     * @param {*} value
     * @returns {this}
     * @memberof GFVariables
     */
  GFVariables.prototype.set = function(key, value) {
    this._variables.set(key, value)
    return this
  }
  GFVariables.prototype.unset = function(key) {
    this._variables['delete'](key)
    return this
  }
  /**
     * Get variable value
     *
     * @param {string} key
     * @returns {*}
     * @memberof GFVariables
     */
  GFVariables.prototype.get = function(key) {
    return this._variables.get(key)
  }
  /**
     * Return the name of variables without ${}
     *
     * @returns {string[]}
     * @memberof GFVariables
     */
  GFVariables.prototype.keys = function() {
    return Array.from(this._variables.keys())
  }
  /**
     * Return all local declared variables and grafana variables
     *
     * @returns {string[]}
     * @memberof GFVariables
     */
  GFVariables.prototype.getFullVarsNames = function() {
    return $GF.getGrafanaVars().concat(this.getVarsNames())
  }
  /**
     * Get the full names of declared local vars
     *
     * @returns {string[]}
     * @memberof GFVariables
     */
  GFVariables.prototype.getVarsNames = function() {
    return this.keys().map(function(x) { return '${' + x + '}' })
  }
  /**
     * Clear all variables
     *
     * @returns {this}
     * @memberof GFVariables
     */
  GFVariables.prototype.clear = function() {
    this._variables.clear()
    return this
  }
  /**
     * Replace text with variables
     *
     * @param {string} text
     * @returns {string}
     * @memberof GFVariables
     */
  GFVariables.prototype.replaceText = function(text) {
    try {
      var templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV)
      text = templateSrv !== undefined ? templateSrv.replaceWithText(text) : text
      for (var _i = 0, _a = this._variables; _i < _a.length; _i++) {
        var _b = _a[_i]; var key = _b[0]; var value = _b[1]
        text = text.replace('${' + key + '}', value)
      }
    } catch (error) {
      return text
    }
    return text
  }
  /**
     * Replace and eval text with variables
     *
     * @param {string} text
     * @returns {string}
     * @memberof GFVariables
     */
  GFVariables.prototype.eval = function(text) {
    var t = this.replaceText(text)
    return $GF.utils.evalIt(t)
  }
  return GFVariables
}())
var GFLog = /** @class */ (function() {
  function GFLog() {
  }
  GFLog.init = function() {
    return new GFLog()
  }
  /**
     * If message must be displayed
     *
     * @param {number} level (DEBUG : 0, INFO : 1, WARN:2, ERROR:3)
     * @returns {boolean}
     * @memberof Log
     */
  GFLog.toDisplay = function(level) {
    if (GFLog.logDisplay !== undefined && GFLog.logDisplay === true) {
      if (GFLog.logLevel !== undefined && level >= GFLog.logLevel) {
        return true
      }
    }
    return false
  }
  /**
     * Display debug message in console
     *
     * @param {string} title
     * @param {((any | undefined))} obj
     * @memberof Log
     */
  GFLog.prototype.debug = function() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function() {
      var title
      return __generator(this, function(_a) {
        if (GFLog.toDisplay(GFLog.DEBUG)) {
          title = args.shift()
          console.debug.apply(console, __spreadArrays(['GF DEBUG : ' + title], args))
        }
        return [2]
      })
    })
  }
  /**
     * Display warn message in console
     *
     * @param {string} title
     * @param {((any | undefined))} obj
     * @memberof Log
     */
  GFLog.prototype.warn = function() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function() {
      var title
      return __generator(this, function(_a) {
        if (GFLog.toDisplay(GFLog.WARN)) {
          title = args.shift()
          console.warn.apply(console, __spreadArrays(['GF WARN : ' + title], args))
        }
        return [2]
      })
    })
  }
  /**
     * Display info message in console
     *
     * @param {string} title
     * @param {((any | undefined))} obj
     * @memberof Log
     */
  GFLog.prototype.info = function() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function() {
      var title
      return __generator(this, function(_a) {
        if (GFLog.toDisplay(GFLog.INFO)) {
          title = args.shift()
          console.info.apply(console, __spreadArrays(['GF INFO : ' + title], args))
        }
        return [2]
      })
    })
  }
  /**
     * Display error message in console
     *
     * @param {string} title
     * @param {((any | undefined))} obj
     * @memberof Log
     */
  GFLog.prototype.error = function() {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function() {
      var title
      return __generator(this, function(_a) {
        if (GFLog.toDisplay(GFLog.ERROR)) {
          title = args.shift()
          console.error.apply(console, __spreadArrays(['GF ERROR : ' + title], args))
        }
        return [2]
      })
    })
  }
  GFLog.DEBUG = 0
  GFLog.INFO = 1
  GFLog.WARN = 2
  GFLog.ERROR = 3
  GFLog.logLevel = GFLog.WARN
  GFLog.logDisplay = true
  return GFLog
}())
var GFPlugin = /** @class */ (function() {
  function GFPlugin() {
  }
  /**
     * init GFPlugin
     *
     * @static
     * @param {*} $scope
     * @param {*} templateSrv
     * @returns {GFPlugin}
     * @memberof GFPlugin
     */
  GFPlugin.init = function($scope, templateSrv, board, ctrl) {
    var plug = new GFPlugin()
    this.contextRoot = GFPlugin.defaultContextRoot
    if ($scope === undefined) {
      this.contextRoot = __dirname
      if (this.contextRoot.length > 0) {
        $GF.setVar($GF.CONSTANTS.VAR_STG_CTXROOT, this.contextRoot)
      }
    } else {
      this.contextRoot = $scope.$root.appSubUrl + this.defaultContextRoot
    }
    $GF.setVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV, templateSrv)
    $GF.setVar($GF.CONSTANTS.VAR_STG_CTXROOT, this.contextRoot)
    $GF.setVar($GF.CONSTANTS.VAR_OBJ_DASHBOARD, board)
    // $GF.setVar($GF.CONSTANTS.VAR_OBJ_CTRL, ctrl);
    // $GF.setVar($GF.CONSTANTS.VAR_OBJ_SCOPE, $scope);
    return plug
  }
  GFPlugin.prototype.getRepo = function() {
    var url = ''
    GFPlugin.data.info.links.forEach(function(link) {
      if (link.name === 'Documentation') {
        url = link.url
      }
    })
    return url
  }
  /**
     * Get version of plugin
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getVersion = function() {
    return GFPlugin.data.info.version
  }
  /**
     * Get root path
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getRootPath = function() {
    return $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT)
  }
  /**
     * Get libs path
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getLibsPath = function() {
    return $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT) + 'libs/'
  }
  /**
     * Get Draw.io libs path
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getDrawioPath = function() {
    return this.getLibsPath() + 'drawio/'
  }
  /**
     * Get statics path
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getStaticPath = function() {
    return this.getRootPath() + 'static/'
  }
  /**
     * Get mxBasePath
     * mxBasePath: Specifies the path in mxClient.basePath.
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getMxBasePath = function() {
    return this.getDrawioPath() + 'mxgraph/'
  }
  /**
     * Return Style path
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getMxStylePath = function() {
    return this.getDrawioPath() + 'styles/'
  }
  /**
     * Return shapes xml path for draw.io
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getShapesPath = function() {
    return this.getDrawioPath() + '/shapes/'
  }
  /**
     * Return partial path
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getPartialPath = function() {
    return this.getRootPath() + 'partials/'
  }
  /**
     * Return stencils js path for draw.io
     *
     * @returns {string}
     * @memberof GFPlugin
     */
  GFPlugin.prototype.getStencilsPath = function() {
    return this.getDrawioPath() + '/stencils/'
  }
  GFPlugin.prototype.getMxCssPath = function() {
    return this.getDrawioPath() + 'styles/'
  }
  GFPlugin.prototype.getMxResourcePath = function() {
    return this.getMxBasePath() + 'css/'
  }
  GFPlugin.prototype.getMxImagePath = function() {
    return this.getMxBasePath() + 'images/'
  }
  //  GFPlugin.data = require('./plugin.json');
  GFPlugin.defaultContextRoot = '/public/plugins/agenty-flowcharting-panel/'
  return GFPlugin
}())
// class GFMessage {
//   static container: HTMLDivElement;
//   static message: HTMLSpanElement;
//   static ERROR_MESSAGE = 'error';
//   static ERROR_COLOR = 'red';
//   static INFO_MESSAGE = 'info';
//   static INFO_COLOR = 'white';
//   static WARNING_MESSAGE = 'warning';
//   static WARNING_COLOR = 'yellow';
//   constructor(parent: HTMLDivElement) {
//     const container = parent;
//     if (container !== null) {
//       GFMessage.container = container;
//       const span = container.querySelector<HTMLSpanElement>('#message-text');
//       if (span === null) {
//         GFMessage.message = document.createElement('span');
//         GFMessage.container.appendChild(GFMessage.message);
//       } else {
//         GFMessage.message = span;
//       }
//     }
//   }
//   static init(parentDiv: HTMLDivElement): GFMessage {
//     return new GFMessage(parentDiv);
//   }
//   async setMessage(message: string, type: string = GFMessage.INFO_MESSAGE) {
//     if (GFMessage.container && GFMessage.message) {
//       GFMessage.message.innerHTML = message;
//       switch (type) {
//         case GFMessage.INFO_MESSAGE:
//           GFMessage.message.style.color = GFMessage.INFO_COLOR;
//           break;
//         case GFMessage.ERROR_MESSAGE:
//           GFMessage.message.style.color = GFMessage.ERROR_COLOR;
//           break;
//         case GFMessage.WARNING_MESSAGE:
//           GFMessage.message.style.color = GFMessage.WARNING_COLOR;
//           break;
//         default:
//           GFMessage.message.style.color = GFMessage.INFO_COLOR;
//           break;
//       }
//       GFMessage.container.style.display = '';
//       $GF.setUniqTimeOut(this.clearMessage, $GF.CONSTANTS.CONF_GFMESSAGE_MS, 'flowcharting-message');
//     }
//   }
//   clearMessage() {
//     if (GFMessage.container && GFMessage.message) {
//       GFMessage.container.style.display = 'none';
//       GFMessage.message.innerHTML = '';
//     }
//     $GF.clearUniqTimeOut('flowcharting-message');
//   }
// }
/**
 * Trace Perf class
 *
 * @class GFTrace
 */
var GFTrace = /** @class */ (function() {
  function GFTrace(fn) {
    if (GFTrace.enable && fn !== undefined) {
      this.trace = {
        Name: fn,
        Id: $GF.utils.uniqueID(),
        Args: undefined,
        Return: undefined,
        Before: Date.now(),
        End: undefined,
        ExecTime: undefined,
        Indent: GFTrace.indent
      }
      GFTrace.trc.set(this.trace.Id, this.trace)
    }
  }
  GFTrace.init = function() {
    return new GFTrace()
  }
  GFTrace.prototype.before = function(fn) {
    if (GFTrace.enable && fn !== undefined) {
      var t = new GFTrace(fn)
      GFTrace.indent++
      GFTrace._inc(fn)
      return t
    }
    return { after: function() { } }
  }
  GFTrace._inc = function(fn) {
    var f = GFTrace.fn.get(fn)
    if (f === undefined) {
      f = {
        Calls: 0,
        Function: fn,
        TotalTimes: 0
      }
    }
    f.Calls++
    GFTrace.fn.set(fn, f)
  }
  GFTrace.prototype.after = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (GFTrace.enable && this.trace !== undefined) {
          if (this.trace) {
            this.trace.End = Date.now()
            GFTrace.indent--
          }
        }
        return [2]
      })
    })
  }
  GFTrace.prototype.clear = function() {
    if (GFTrace.enable) {
      GFTrace.trc.clear()
      GFTrace.fn.clear()
    }
  }
  GFTrace.prototype.enable = function() {
    GFTrace.enable = true
  }
  GFTrace.prototype.disable = function() {
    GFTrace.enable = false
  }
  GFTrace.prototype.isEnabled = function() {
    return GFTrace.enable
  }
  GFTrace.prototype.resume = function() {
    return __awaiter(this, void 0, void 0, function() {
      var tb_1, fn_1
      return __generator(this, function(_a) {
        if (GFTrace.enable) {
          tb_1 = []
          fn_1 = []
          GFTrace.trc.forEach(function(trace) {
            trace.ExecTime = trace.End - trace.Before
            var f = GFTrace.fn.get(trace.Name)
            f.TotalTimes += trace.ExecTime
            tb_1.push(trace)
          })
          console.table(tb_1, ['Indent', 'Name', 'ExecTime'])
          GFTrace.fn.forEach(function(f) {
            fn_1.push(f)
          })
          console.table(fn_1, ['Function', 'Calls', 'TotalTimes'])
          this.clear()
        }
        return [2]
      })
    })
  }
  GFTrace.enable = false
  GFTrace.trc = new Map()
  GFTrace.fn = new Map()
  GFTrace.indent = 0
  return GFTrace
}())
export const $GF = /** @class */ (function() {
  function $GF() {
  }
  $GF.init = function($scope, templateSrv, board, ctrl) {
    console.log('GF init')
    if (!this.plugin) {
      this.plugin = GFPlugin.init($scope, templateSrv, board, ctrl)
      if (this.DEBUG) {
        console.log('DEBUG Scope', $scope)
        console.log('DEBUG TemplateSrv', templateSrv)
   //     console.log('DEBUG Theme', board.style)
        console.log('DEBUG board', board)
      }
    }
    if (!this.log) {
      this.log = GFLog.init()
    }
    if (!this.trace) {
      this.trace = GFTrace.init()
    }
    return this
  }
  $GF.me = function() {
    return this
  }
  /**
     * Recover Meassage div in module.html
     *
     * @static
     * @param {HTMLElement} html
     * @memberof $GF
     */
  // static setMessageDiv(html: HTMLDivElement) {
  //   this.message = GFMessage.init(html);
  // }
  /**
     * Replace/resolve variables
     *
     * @static
     * @param {string} text
     * @memberof $GF
     */
  $GF.resolveVars = function(text) {
    return this.getGlobalVars().replaceText(text)
  }
  /**
     * Return the theme
     *
     * @static
     * @returns {string}
     * @memberof $GF
     */
  $GF.getTheme = function() {
    var templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV)
    var theme = templateSrv !== undefined ? templateSrv.style : 'dark'
    return theme
  }
  /**
     * angular $apply
     *
     * @memberof $GF
     */
  // static async refresh() {
  //   const scope = $GF.getVar($GF.CONSTANTS.VAR_OBJ_SCOPE);
  //   await scope.$applyAsync();
  // }
  /**
     * Create and get local variables container
     *
     * @static
     * @returns {GFVariables}
     * @memberof GFGlobal
     */
  $GF.createLocalVars = function() {
    var _v = new GFVariables()
    return _v
  }
  /**
     * Return a dynamic GFTable
     *
     * @static
     * @param {*} init
     * @memberof $GF
     */
  $GF.createGFTable = function(table, div) {
    return new GFTable(table, div)
  }
  /**
     * Get global variables container
     *
     * @static
     * @returns {GFVariables}
     * @memberof GFGlobal
     */
  $GF.getGlobalVars = function() {
    if ($GF._globalvars === undefined) {
      $GF._globalvars = new GFVariables()
    }
    return $GF._globalvars
  }
  $GF.getGrafanaVars = function() {
    var templateSrv = $GF.getVar($GF.CONSTANTS.VAR_OBJ_TEMPLATESRV)
    if (templateSrv !== undefined && templateSrv !== null) {
      return lodash_1.map(templateSrv.variables, function(variable) { return '${' + variable.name + '}' })
    }
    return []
  }
  /**
     * Get global variable value
     *
     * @static
     * @param {*} key
     * @returns {*}
     * @memberof GFGlobal
     */
  $GF.getVar = function(key) {
    return $GF.getGlobalVars().get(key)
  }
  /**
     * set global variable with value
     *
     * @static
     * @param {*} key
     * @param {*} value
     * @memberof GFGlobal
     */
  $GF.setVar = function(key, value) {
    $GF.getGlobalVars().set(key, value)
  }
  $GF.unsetVar = function(key) {
    $GF.getGlobalVars().unset(key)
  }
  /**
     * Get all available variables name
     *
     * @static
     * @returns {string[]}
     * @memberof GFGlobal
     */
  $GF.getFullAvailableVarNames = function() {
    return GFVariables.getAvailableLocalVarNames().concat($GF.getGrafanaVars())
  }
  /**
     * Return text for a value
     *
     * @static
     * @param {TSelectString[]} list
     * @param {*} value
     * @memberof $GF
     */
  $GF.GetT4V = function(list, value) {
    if (list) {
      for (var i = 0; i < list.length; i++) {
        var element = list[i]
        if (element.value === value) {
          return element.text
        }
      }
    }
    return 'No text '
  }
  /**
     * Set focus to id dom
     *
     * @param {string} id
     * @returns
     * @memberof $GF
     */
  $GF.setFocus = function(id) {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        try {
          setTimeout(function() {
            var elt = document.getElementById(id)
            if (elt) {
              elt.focus()
            }
          }, 100)
          return [2 /* return*/, true]
        } catch (error) {
          return [2 /* return*/, false]
        }
        return [2]
      })
    })
  }
  $GF.calculateIntervalCounter = function(begin, end, count, method) {
    if (method === void 0) { method = 'linear' }
    var result = []
    var step
    var current
    if (begin !== undefined && end !== undefined) {
      var distance = end - begin
      step = Math.round(distance / count)
      current = begin
    } else {
      step = undefined
    }
    var index = 0
    for (index = 0; index < count; index++) {
      if (step !== undefined) {
        current += step
      } else {
        current = undefined
      }
      result.push(current)
    }
    result[index] = end
    return result
  }
  ///新开线程定时
  $GF.setUniqTimeOut = function(fc, timer, id) {
    var timeout = $GF.getVar($GF.CONSTANTS.VAR_MAP_TIMEOUT)
    if (timeout === undefined) {
      timeout = new Map()
      $GF.setVar($GF.CONSTANTS.VAR_MAP_TIMEOUT, timeout)
    }
    if (id !== undefined) {
      this.clearUniqTimeOut(id)
    }
    var thread = window.setTimeout(fc, timer)
    id = id === undefined ? thread.toString() : id
    timeout.set(id, thread)
    return id
  }
  $GF.clearUniqTimeOut = function(id) {
    var timeout = $GF.getVar($GF.CONSTANTS.VAR_MAP_TIMEOUT)
    if (timeout !== undefined) {
      try {
        var tm = timeout.get(id)
        if (tm !== undefined) {
          timeout['delete'](id)
          window.clearTimeout(tm)
        }
      } catch (error) {
        $GF.log.warn('Failed to clear timeout thread', id, error)
      }
    }
  }
  $GF.getCurrentDate = function() {
    var currentDateTime = new Date()
    var d = currentDateTime.getFullYear() +
            '-' +
            (currentDateTime.getMonth() + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            '-' +
            currentDateTime.getDate().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ' ' +
            currentDateTime.getHours().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ':' +
            currentDateTime.getMinutes().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            }) +
            ':' +
            currentDateTime.getSeconds().toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })
    return d
  }
  /**
     * Compute a ratio, used for parameters of _getColorForRatio
     *
     * @private
     * @param {number} beginValue
     * @param {number} endValue
     * @param {number} value
     * @returns {number}
     * @memberof Rule
     */
  $GF.calculateRatioForValue = function(beginValue, endValue, value) {
    if (value < beginValue || value > endValue) {
      throw new Error('Cannot calculate ratio for value ' + value + ' because value is less than ' + beginValue + ' or greater than ' + endValue)
    }
    var absoluteDistance = endValue - beginValue
    var valueDistanceFromMin = value - beginValue
    var ratio = valueDistanceFromMin / absoluteDistance
    return ratio
  }
  /**
     * Calulate a value between 2 values with a ratio
     *
     * @private
     * @param {number} beginValue
     * @param {number} endValue
     * @param {number} ratio
     * @returns
     * @memberof Rule
     */
  $GF.calculateValueForRatio = function(beginValue, endValue, ratio) {
    return beginValue + (endValue - beginValue) * ratio
  }
  /**
     * Calulate a color between 2 colors with a ratio
     *
     * @private
     * @param {string} beginColor
     * @param {string} endColor
     * @param {number} ratio
     * @returns {string}
     * @memberof Rule
     */
  $GF.calculateColorForRatio = function(beginColor, endColor, ratio) {
    var color = endColor
    try {
      color = chroma_js_1['default']
        .scale([beginColor, endColor])
        .mode('lrgb')(ratio)
        .hex()
    } catch (error) {
      color = endColor
    }
    return color
  }
  /**
     * Add a new Intervall (window.setInterval)
     *
     * @static
     * @param {CallableFunction} fc
     * @param {number} timer
     * @returns {number}
     * @memberof GFGlobal
     */
  $GF.setUniqInterval = function(fc, timer, id) {
    var interval = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL)
    if (interval === undefined) {
      interval = new Map()
      $GF.setVar($GF.CONSTANTS.VAR_MAP_INTERVAL, interval)
    }
    if (id !== undefined) {
      this.clearUniqInterval(id)
    }
    var thread = window.setInterval(fc, timer)
    id = id === undefined ? thread.toString() : id
    interval.set(id, thread)
    return id
  }
  /**
     * Add/clear a  Intervall (window.clearInterval)
     *
     * @static
     * @param {string} id
     * @memberof GFGlobal
     */
  $GF.clearUniqInterval = function(id) {
    var interval = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL)
    if (interval !== undefined) {
      try {
        var int = interval.get(id)
        interval['delete'](id)
        window.clearInterval(int)
      } catch (error) {
        $GF.log.warn('Failed to clear interval thread', id, error)
      }
    }
  }
  /**
     * Load a file into variables
     *
     * @static
     * @param {string} varName
     * @param {string} fileName
     * @memberof GFGlobal
     */
  $GF.loadLocalFile = function(varName, fileName) {
    return __awaiter(this, void 0, void 0, function() {
      var v, contextroot, filePath_1, txt
      return __generator(this, function(_a) {
        v = $GF.getVar(varName)
        if (v === undefined) {
          contextroot = $GF.getVar($GF.CONSTANTS.VAR_STG_CTXROOT)
          if (contextroot !== undefined) {
            filePath_1 = contextroot + '/' + fileName
            if (window.fetch) {
              // exécuter ma requête fetch ici
              fetch(filePath_1)
                .then(function(response) {
                  if (response.ok) {
                    response
                      .text()
                      .then(function(text) {
                        $GF.log.info('loadLocalFile called succesfully', filePath_1)
                        $GF.setVar(varName, text)
                        return text
                      })['catch'](function(error) { return $GF.log.error('Error when download text file', filePath_1, error) })
                  }
                })['catch'](function(error) { return $GF.log.error('Error when download file', filePath_1, error) })
            } else {
              txt = $GF.utils.loadFile(fileName)
              if (txt) {
                $GF.setVar(varName, $GF.utils.loadFile(fileName))
                return [2 /* return*/, txt]
              }
            }
          } else {
            $GF.log.warn('loadLocalFile Contexroot : ', contextroot)
          }
        }
        return [2 /* return*/, false]
      })
    })
  }
  $GF.setGraphHover = function(timestamp) {
    if (this.isGraphHoverEnabled()) {
      this.graphHover = true
      this.GHTimeStamp = timestamp
    }
  }
  $GF.unsetGraphHover = function() {
    this.graphHover = false
    this.GHTimeStamp = 0
  }
  $GF.hasGraphHover = function() {
    return this.graphHover && this.isGraphHoverEnabled()
  }
  $GF.isGraphHoverEnabled = function() {
    var board = this.getVar($GF.CONSTANTS.VAR_OBJ_DASHBOARD)
    return board !== undefined && board.sharedTooltipModeEnabled()
  }
  $GF.getGraphHover = function() {
    if (this.hasGraphHover()) {
      // return this.getVar($GF.CONSTANTS.VAR_NUM_GHTIMESTAMP);
      return this.GHTimeStamp
    }
    return undefined
  }
  /**
     * Return true if mouse is in panel
     *
     * @static
     * @returns {boolean}
     * @memberof $GF
     */
  // static isMouseInPanel(): boolean {
  //   const ctrl = this.getVar($GF.CONSTANTS.VAR_OBJ_CTRL);
  //   if (ctrl) {
  //     return ctrl.isMouseIn();
  //   }
  //   return false;
  // }
  /**
     * Return Html for popup with links to documentation
     *
     * @param {string} text
     * @param {string} tagBook
     * @param {string} [tagImage]
     * @returns {string}
     * @memberof $GF
     */
  $GF.popover = function(text, tagBook, tagImage) {
    var url = $GF.plugin.getRepo()
    var images = this.plugin.getRepo() + 'images/'
    var textEncoded = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
    var desc = '' + textEncoded
    var book = ''
    var image = ''
    if (tagBook) {
      book = '<a href="' + url + tagBook + '" target="_blank"><i class="fa fa-book fa-fw"></i>Help</a>'
    }
    if (tagImage) {
      image = '<a href="' + images + tagImage + '.png" target="_blank"><i class="fa fa-image fa-fw"></i>Example</a>'
    }
    return '\n    <div id="popover" style="display:flex;flex-wrap:wrap;width: 100%;">\n      <div style="flex:1;height:100px;margin-bottom: 20px;">' + desc + '</div>\n      <div style="flex:1;height:100px;margin-bottom: 20px;">' + book + '</div>\n      <div style="flex-basis: 100%;height:100px;margin-bottom:20px;">' + image + '</div>\n    </div>'
  }
  $GF.destroy = function() {
    var interval = $GF.getVar($GF.CONSTANTS.VAR_MAP_INTERVAL)
    if (interval !== undefined) {
      interval.forEach(function(x) { return $GF.clearUniqInterval(x) })
      interval.clear()
    }
    var timeout = $GF.getVar($GF.CONSTANTS.VAR_MAP_TIMEOUT)
    if (timeout !== undefined) {
      timeout.forEach(function(x) { return $GF.clearUniqTimeOut(x) })
      timeout.clear()
    }
  }
  $GF._globalvars = new GFVariables()
  $GF.CONSTANTS = new GFCONSTANT()
  $GF.graphHover = false
  $GF.GHTimeStamp = 0
  $GF.DEBUG = true
  $GF.utils = require('./utils_raw')
  return $GF
}()) 
export const GFTable = /** @class */ (function() {
  function GFTable(table, div) {
    this.pressed = false
    this.indexTable = 0
    this.startX = 0
    this.startWidth = 0
    this.tableData = table
    this.tableDiv = div
  }
  GFTable.prototype.getWidth = function(id) {
    return this.getColumnProperty(id, 'width')
  }
  GFTable.prototype.getLeft = function(id) {
    var sizes = 0
    var found = false
    this.tableData.columns.forEach(function(c) {
      if (c.id !== id && found === false) {
        sizes += parseInt(c.width, 10)
      }
      if (c.id === id) {
        found = true
      }
    })
    return sizes + 'px'
  }
  GFTable.prototype.getStyle = function(id) {
    // const properties = ['width', 'align'];
    var style = ''
    if (this.haveProperty(id, 'width')) {
      var prop = this.getColumnProperty(id, 'width')
      style = style + 'width: ' + prop + ';'
    }
    if (this.haveProperty(id, 'align')) {
      var prop = this.getColumnProperty(id, 'align')
      style = style + 'text-align: ' + prop + ';'
    }
    return style
  }
  GFTable.prototype.getIndex = function(id) {
    return this.getColumnProperty(id, 'index')
  }
  GFTable.prototype.getId = function(index) {
    return this.getColumnProperty(index, 'id')
  }
  GFTable.prototype.getLabel = function(id) {
    return this.getColumnProperty(id, 'label')
  }
  GFTable.prototype.getDesc = function(id) {
    return this.getColumnProperty(id, 'desc')
  }
  GFTable.prototype.getColumnProperty = function(id, property) {
    var result = 'No value for property ' + property
    var isNumber = typeof id === 'number'
    for (var index = 0; index < this.tableData.columns.length; index++) {
      var element = this.tableData.columns[index]
      if ((isNumber && id === element.index) || (!isNumber && id === element.id)) {
        return element[property]
      }
    }
    return result
  }
  GFTable.prototype.haveProperty = function(id, property) {
    var isNumber = typeof id === 'number'
    for (var index = 0; index < this.tableData.columns.length; index++) {
      var element = this.tableData.columns[index]
      if ((isNumber && id === element.index) || (!isNumber && id === element.id)) {
        return element[property] !== undefined && element[property] !== null
      }
    }
    return false
  }
  GFTable.prototype.setColumnProperty = function(id, property, value) {
    var isNumber = typeof id === 'number'
    for (var index = 0; index < this.tableData.columns.length; index++) {
      var element = this.tableData.columns[index]
      if ((isNumber && id === element.index) || (!isNumber && id === element.id)) {
        var prop = property
        element[prop] = value
      }
    }
    return this
  }
  GFTable.prototype.findTableDiv = function(elt) {
    if (elt !== null && elt !== undefined) {
      // CANT BUILD WITH FORCE CASTING
      var node = elt
      while (node !== null && this.tableDiv === undefined) {
        if (node.classList.contains('gf-table-main')) {
          this.tableDiv = node
        } else {
          node = node.parentElement
        }
      }
    }
    return this.tableDiv
  }
  GFTable.prototype.setTableDiv = function(div) {
    this.tableDiv = div
  }
  GFTable.prototype.onMouseMove = function(event) {
    var _this = this
    if (this.pressed && this.headerTable && this.headerTable.parentNode) {
      var delta = event.pageX - this.startX
      var width_1 = this.startWidth + delta
      if (width_1 < 10) {
        width_1 = 10
      }
      this.headerTable.style.width = width_1 + 'px'
      if (this.bodyTable) {
        var rows = this.bodyTable.querySelectorAll('.gf-table-rows-resizable')
        Array.from(rows).forEach(function(r) {
          var cells = r.querySelectorAll('.gf-table-cells-resizable')
          var index = 0
          cells.forEach(function(cell) {
            // CANT BUILD WITH FORCE CASTING
            var node = cell
            if (index === _this.indexTable) {
              node.style.width = width_1 + 'px'
              _this.setColumnProperty(index, 'width', width_1 + 'px')
            }
            index += 1
          })
        })
      }
    }
  }
  GFTable.prototype.onMouseDown = function(event) {
    this.pressed = true
    this.startX = event.pageX
    // console.log('onMouseDown',event);
    this.headerTable = event.currentTarget.parentElement
    if (this.headerTable) {
      if (!this.tableDiv) {
        this.findTableDiv(this.headerTable)
      }
      if (this.headerTable.parentNode) {
        this.indexTable = Array.from(this.headerTable.parentNode.children).indexOf(this.headerTable)
      }
      this.headerTable.classList.add('gf-resizing')
      this.startWidth = parseInt(this.headerTable.style.width, 10)
      if (this.tableDiv) {
        // CANT BUILD WITH HTMLDIVELEMENT
        var body = this.tableDiv.getElementsByClassName('gf-table-body')[0]
        this.bodyTable = body
      } else {
        $GF.log.error('Unable to find table definition with class gf-table-main')
      }
    }
  }
  GFTable.prototype.onMouseUp = function(event) {
    this.pressed = false
    if (this.headerTable) {
      this.headerTable.classList.remove('gf-resizing')
    }
  }
  return GFTable
}())
//exports.GFTable = GFTable
var GFTimer = /** @class */ (function() {
  function GFTimer(uniqId) {
    this.iteration = 0
    this.cyclic = false
    this.currentStep = 0
    if (GFTimer.timers === undefined) {
      GFTimer.timers = new Map()
    }
    this.units = []
    this.uniqId = uniqId
  }
  GFTimer.stop = function(uniqId) {
    if (GFTimer.timers === undefined) {
      GFTimer.timers = new Map()
    }
    if (uniqId !== undefined) {
      var gftimer = GFTimer.timers.get(uniqId)
      if (gftimer) {
        gftimer.cancel()
        GFTimer.timers['delete'](uniqId)
      }
    } else {
      GFTimer.timers.forEach(function(gftimer, key, map) {
        gftimer.cancel()
      })
      GFTimer.timers.clear()
    }
  }
  GFTimer.prototype.setCyclic = function(bool) {
    if (bool === void 0) { bool = true }
    this.cyclic = bool
    this.iteration = 0
    return this
  }
  GFTimer.prototype.setIteration = function(it) {
    if (it === void 0) { it = 0 }
    this.iteration = it
    this.cyclic = false
    return this
  }
  GFTimer.prototype._reinit = function() {
    this.currentStep = 0
    this.units.forEach(function(u) {
      u.runned = false
      u.invalidated = false
    })
    return this
  }
  GFTimer.prototype.cancel = function() {
    this.units.forEach(function(t) {
      GFTimer._cleanUnit(t)
    })
    return this
  }
  GFTimer.prototype._getDefaultTimerUnit = function() {
    return {
      step: this.units.length,
      fn: function() { },
      ms: 1000,
      running: false,
      runned: false,
      invalidated: false,
      tmId: 0
    }
  }
  GFTimer._cleanUnit = function(unit) {
    if (unit !== undefined && unit.invalidated === false && unit.runned === false) {
      unit.invalidated = true
      GFTimer._stopTimeOut(unit.tmId)
    }
  }
  GFTimer._stopTimeOut = function(id) {
    try {
      if (id !== undefined) {
        window.clearTimeout(id)
      }
    } catch (error) {
      $GF.log.warn('Failed to clear timeout thread', id, error)
    }
  }
  GFTimer.getNewTimer = function(uniqId) {
    GFTimer.stop(uniqId)
    var gftimer = new GFTimer(uniqId)
    GFTimer.timers.set(uniqId, gftimer)
    return gftimer
  }
  GFTimer.getTimer = function(uniqId) {
    if (GFTimer.timers !== undefined) {
      return GFTimer.timers.get(uniqId)
    }
    return undefined
  }
  GFTimer.prototype.add = function(fn, ms) {
    var unit = this._getDefaultTimerUnit()
    unit.fn = fn
    unit.ms = ms
    this.units.push(unit)
    return this
  }
  GFTimer.prototype.run = function() {
    var length = this.units.length
    for (var i = 0; i < length; i++) {
      var u = this.units[i]
      u.tmId = window.setTimeout(this._runnable.bind(this, u), u.ms)
    }
    return this
  }
  GFTimer.prototype._runnable = function(unit) {
    if (unit.invalidated === false) {
      unit.running = true
      try {
        for (var i = this.currentStep; i < unit.step; i++) {
          GFTimer._cleanUnit(this.units[i])
        }
        unit.fn()
      } catch (error) {
        $GF.log.warn('Failed to run fn', error)
      }
      this.currentStep = unit.step
      unit.running = false
      unit.runned = true
      if (unit.step === this.units.length - 1) {
        if (this.cyclic || this.iteration > 0) {
          this._reinit()
          if (this.iteration > 0) {
            this.iteration = this.iteration - 1
          }
          this.run()
        } else {
          GFTimer.timers['delete'](this.uniqId)
        }
      }
    }
  }
  return GFTimer
}())
//exports.$GF = $GF

export default {GFTimer,$GF }