export default    [
    {
        "label": "下拉选择",
        "showLabel": true,
        "tag": "el-select",
        "tagIcon": "select",
        "placeholder": "请选择下拉选择",
        "style": {
            "width": "100%"
        },
        "span": 12,
        "labelWidth": null,
        "clearable": true,
        "disabled": false,
        "required": false,
        "filterable": false,
        "multiple": false,
        "options": [
            {
                "label": "选项一",
                "value": "选项一"
            },
            {
                "label": "选项二",
                "value": "选项二"
            }
        ],
        "regList": [],
        "changeTag": true,
        "proCondition": true,
        "formId": 2,
        "__ID": 1673797346650,
        "layout": "colFormItem",
        "vModel": "field2",
        "offset": 0
    },
    {
        "label": "日期范围",
        "showLabel": true,
        "tag": "fc-date-duration",
        "showDuration": false,
        "tagIcon": "date-range",
        "defaultValue": null,
        "span": 24,
        "labelWidth": null,
        "style": {
            "width": "100%"
        },
        "type": "daterange",
        "range-separator": "至",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        "disabled": false,
        "clearable": true,
        "required": true,
        "format": "YYYY-MM-DD",
        "value-format": "YYYY-MM-DD",
        "readonly": false,
        "regList": [],
        "changeTag": true,
        "proCondition": true,
        "asSummary": false,
        "formId": 1,
        "__ID": 1673793309685,
        "layout": "colFormItem",
        "vModel": "field1",
        "offset": 0,
        "push": 0,
        "pull": 0
    },
    {
        "layout": "rowFormItem",
        "tag": "el-row",
        "cols": [
            {
                "span": 12,
                "children": []
            },
            {
                "span": 12,
                "children": []
            }
        ],
        "rowType": "layout",
        "tagIcon": "row",
        "type": "default",
        "justify": "start",
        "align": "top",
        "label": "行容器",
        "layoutTree": true,
        "children": [],
        "showDivider": true,
        "description": "",
        "span": 12,
        "formId": 3,
        "__ID": 1673797410034,
        "componentName": "row3",
        "gutter": 15,
        "offset": 0
    },
    {
        "layout": "rowFormItem",
        "tag": "el-row",
        "cols": [
            {
                "span": 12,
                "children": []
            },
            {
                "span": 12,
                "children": []
            }
        ],
        "rowType": "layout",
        "tagIcon": "row",
        "type": "default",
        "justify": "start",
        "align": "top",
        "label": "行容器",
        "layoutTree": true,
        "children": [],
        "showDivider": true,
        "description": "",
        "span": 12,
        "formId": 4,
        "__ID": 1673797421623,
        "componentName": "row4",
        "gutter": 15
    },
    {
        "showLabel": false,
        "tag": "el-tabs",
        "span": 12,
        "tabPosition": "top",
        "disabled": false,
        "tagIcon": "tab",
        "children": [],
        "tabpanes": [
            {
                "label": "Tab1",
                "value": "Tab1",
                "content": "tab1",
                "children": []
            },
            {
                "label": "Tab2",
                "value": "Tab2",
                "content": "tab2",
                "children": []
            },
            {
                "label": "New Tab",
                "value": "1673797447193",
                "children": []
            },
            {
                "label": "New Tab",
                "value": "1673797450399",
                "children": []
            },
            {
                "label": "New Tab",
                "value": "1673797451198",
                "children": []
            }
        ],
        "activeName": "Tab1",
        "type": "border-card",
        "justify": "start",
        "align": "top",
        "label": "标签页",
        "layoutTree": false,
        "actionText": "添加",
        "showDivider": true,
        "defaultValue": "1673797451198",
        "formId": 5,
        "__ID": 1673797436328,
        "layout": "colFormItem",
        "vModel": "field5",
        "offset": 12
    }
]