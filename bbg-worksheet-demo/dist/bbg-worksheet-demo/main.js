(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid sticky-top fixed-size-header mb-3\">\n  <div class=\"row border border-left-0 border-right-0 border-top-0 border-secondary py-3\">\n    <div class=\"col-6\">\n      <h3 class=\"text-truncate\">\n        BBG Worksheets Demo\n      </h3>\n    </div>\n    <div class=\"col-6 text-right\" >\n      <!-- Control if button is disabled or not with tick42-icon-button-disabled -->\n      <button type=\"button\" class=\"tick42-icon-horizontal tick42-square-icon-horizontal\" [disabled]=\"!excelAvailable || currentSecurities.length < 1\"\n        (click)=\"exportWorksheet()\">\n        <span class=\"tick42-icon-nav bg-info tick42-icon-small\">\n          <span class=\"tick42-custom-icon icon-size-16\">\n            <i class=\"icon-file-excel\"></i>\n          </span>\n        </span>\n        <span class=\"tick42-icon-nav-label\" >Export to Excel</span>\n      </button>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid\">\n  <div class=\"row\" *ngIf=\"bloombergAvailable\">\n    <div class=\"col\">\n      <div class=\"card\">\n        <!-- Switch card-body when you change tabs -->\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <h5 class=\"card-title mt-1 mb-0\">Created Worksheets</h5>\n            </div>\n            <div class=\"col text-right\">\n              <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" (click)=\"createWorksheet()\">\n                Create Worksheet\n              </button>\n            </div>\n          </div>\n          <ul class=\"list-group list-group-flush\">\n            <li class=\"list-group-item\" *ngFor=\"let worksheet of worksheets\" id=\"{{ worksheet.id }}\" [class.active]=\"worksheet.id === currentWorksheet?.id\"\n              (click)=\"selectWorksheet(worksheet)\">\n              {{worksheet.name}}\n            </li>\n          </ul>\n\n        </div>\n\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <h5 class=\"card-title mt-1 mb-0\">Securities</h5>\n            </div>\n            <div class=\"col text-right\">\n              <!-- <div class=\"dropdown\">\n                <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\"\n                  aria-haspopup=\"true\" aria-expanded=\"true\">\n                  Add Entry\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right visible\" aria-labelledby=\"dropdownMenuButton\"\n                  x-placement=\"bottom-start\" style=\"right: 0\">\n                  <a class=\"dropdown-item\" *ngFor=\"let security of getSecuritiesToAppend()\" (click)=\"appendSecurityToSheet(security)\"\n                    href=\"#\">{{ security }}</a>\n                </div>\n              </div> -->\n              <div ngbDropdown>\n                <button class=\"btn btn-primary\" type=\"button\" id=\"dropdownMenuButton\" [disabled]=\"!currentWorksheet\"\n                  ngbDropdownToggle>\n                  Add Entry\n                </button>\n                <div class=\"dropdown-menu dropdown-menu-right visible\" aria-labelledby=\"dropdownMenuButton\"\n                  ngbDropdownMenu>\n                  <a class=\"dropdown-item\" *ngFor=\"let security of getSecuritiesToAppend()\" (click)=\"appendSecurityToSheet(security)\"\n                    href=\"#\">{{ security }}</a>\n                </div>\n              </div>\n            </div>\n          </div>\n          <ul class=\"list-group list-group-flush securities\">\n            <li class=\"list-group-item\" *ngFor=\"let security of currentSecurities\" (click)=\"selectSecurity(security)\">\n              {{security}}\n              <!-- <i class=\"icon-cancel text-danger\" (click)=\"removeSecurity(security)\"></i> -->\n            </li>\n            <li class=\"list-group-item\" *ngIf=\"currentSecurities.length < 1 && currentWorksheet\">No securities added</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"row\" *ngIf=\"!bloombergAvailable\">\n    <div class=\"col-12\">\n      <div class=\"jumbotron\">\n        <h1 class=\"display-4\">Bloomberg Bridge not available</h1>\n        <hr class=\"my-4\">\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"container-fluid fixed-bottom\" style=\"background-color: #152327\">\n  <div class=\"row py-2\">\n    <div class=\"col-6\">\n      <div class=\"logo-container\"></div>\n    </div>\n    <div class=\"col-6\">\n      <div class=\"d-flex status-container\" style=\"justify-content: flex-end\">\n        <div class=\"d-inline\">\n          <small class=\"status-connected small\">\n            <span class=\"tick42-custom-icon icon-inherit-color icon-size-12\" [ngClass]=\"{'text-success': bloombergAvailable, 'text-danger': !bloombergAvailable}\">\n              <i class=\"icon-record\"></i>\n            </span>\n            Bloomberg\n            <!-- {{glueConnected ? 'Connected' : 'Disconnected'}} -->\n          </small>\n          <small class=\"status-connected small\">\n            <span class=\"tick42-custom-icon icon-inherit-color icon-size-12\" [ngClass]=\"{'text-success': glueConnected, 'text-danger': !glueConnected}\">\n              <i class=\"icon-record\"></i>\n            </span>\n            Glue\n            <!-- {{glueConnected ? 'Connected' : 'Disconnected'}} -->\n          </small>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container,\n.row {\n  padding-top: 20px; }\n\nli:hover {\n  cursor: pointer; }\n\nbutton.btn.btn-primary {\n  margin-left: 15px; }\n\n.securities .icon-cancel {\n  opacity: 0;\n  transition: all .25s ease;\n  position: absolute;\n  right: 1.25rem;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%); }\n\n.securities .list-group-item:hover .icon-cancel {\n  opacity: 1; }\n\n.list-group-flush .list-group-item {\n  cursor: pointer;\n  transition: all .25s ease; }\n\n.list-group-flush .list-group-item:hover {\n  padding-left: 1.5rem;\n  color: #d1da27; }\n\n.dropdown-menu-right[style] {\n  right: 0 !important;\n  left: unset !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXGRldmVsb3BtZW50XFxhbGwtZW50ZXJwcmlzZS1kZW1vc1xcYmJnLXdvcmtzaGVldC1kZW1vXFxiYmctd29ya3NoZWV0LWRlbW8vc3JjXFxhcHBcXGFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFSSxrQkFBaUIsRUFDcEI7O0FBRUQ7RUFDSSxnQkFBZSxFQUNsQjs7QUFFRDtFQUNJLGtCQUFpQixFQUNwQjs7QUFFRDtFQUNFLFdBQVU7RUFFViwwQkFBeUI7RUFDekIsbUJBQWtCO0VBQ2xCLGVBQWM7RUFDZCxTQUFRO0VBQ1Isb0NBQTJCO1VBQTNCLDRCQUEyQixFQUM1Qjs7QUFFRDtFQUNFLFdBQVUsRUFDWDs7QUFFRDtFQUNFLGdCQUFlO0VBRWYsMEJBQXlCLEVBQzFCOztBQUVEO0VBQ0UscUJBQW9CO0VBQ3BCLGVBQWMsRUFDZjs7QUFFRDtFQUNFLG9CQUFrQjtFQUNsQix1QkFBcUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyLFxuLnJvdyB7XG4gICAgcGFkZGluZy10b3A6IDIwcHg7XG59XG5cbmxpOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbi5idG4uYnRuLXByaW1hcnkge1xuICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xufVxuXG4uc2VjdXJpdGllcyAuaWNvbi1jYW5jZWwge1xuICBvcGFjaXR5OiAwO1xuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7XG4gIHRyYW5zaXRpb246IGFsbCAuMjVzIGVhc2U7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDEuMjVyZW07XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbi5zZWN1cml0aWVzIC5saXN0LWdyb3VwLWl0ZW06aG92ZXIgLmljb24tY2FuY2VsIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLmxpc3QtZ3JvdXAtZmx1c2ggLmxpc3QtZ3JvdXAtaXRlbSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlO1xuICB0cmFuc2l0aW9uOiBhbGwgLjI1cyBlYXNlO1xufVxuXG4ubGlzdC1ncm91cC1mbHVzaCAubGlzdC1ncm91cC1pdGVtOmhvdmVyIHtcbiAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XG4gIGNvbG9yOiAjZDFkYTI3O1xufVxuXG4uZHJvcGRvd24tbWVudS1yaWdodFtzdHlsZV0ge1xuICByaWdodDogMCFpbXBvcnRhbnQ7XG4gIGxlZnQ6IHVuc2V0IWltcG9ydGFudDtcbn1cblxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_bloomberg_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/bloomberg.service */ "./src/app/services/bloomberg.service.ts");
/* harmony import */ var _services_excel_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/excel-service.service */ "./src/app/services/excel-service.service.ts");
/* harmony import */ var _mock_data_worksheet_and_securities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mock-data/worksheet-and-securities */ "./src/app/mock-data/worksheet-and-securities.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _services_glue_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/glue.service */ "./src/app/services/glue.service.ts");
/* harmony import */ var _create_worksheet_create_worksheet_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-worksheet/create-worksheet.component */ "./src/app/create-worksheet/create-worksheet.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var AppComponent = /** @class */ (function () {
    function AppComponent(glueService, excelServiceService, bloombergService, config, modalService) {
        var _this = this;
        this.glueService = glueService;
        this.excelServiceService = excelServiceService;
        this.bloombergService = bloombergService;
        this.modalService = modalService;
        this.title = 'bbg-worksheet-demo';
        this.securities = _mock_data_worksheet_and_securities__WEBPACK_IMPORTED_MODULE_3__["securities"];
        this.worksheets = [];
        this.currentSecurities = [];
        this.worksheetDialogOpened = true;
        this.excelAvailable = false;
        this.glueConnected = false;
        this.bloombergAvailable = false;
        this.glueService.getGlueInstance()
            .then(function (glue) {
            _this.glue = glue;
            _this.glue.connection.connected(function () {
                _this.glueConnected = true;
            });
            _this.glue.connection.disconnected(function () {
                _this.glueConnected = false;
            });
            return glue.excel.ready();
        }).then(function () {
            _this.excelAvailable = _this.glue.excel.addinStatus;
            _this.glue.excel.onAddinStatusChanged(function (newStatus) {
                _this.excelAvailable = newStatus;
            });
        });
        this.fetchWorksheets();
        this.excelServiceService.getSecurities()
            .subscribe(function (newSecurities) {
            if (!newSecurities) {
                return;
            }
            _this.currentSecurities = newSecurities.map(function (s) { return s.ticker; });
        });
        this.watchForChanges();
        config['placement'] = 'bottom-start';
    }
    AppComponent.prototype.ngOnDestroy = function () {
    };
    AppComponent.prototype.fetchWorksheets = function () {
        var _this = this;
        if (this.bloombergAvailable) {
            this.bloombergService.getWorksheets()
                .then(function (sheets) { return _this.worksheets = sheets; })
                .catch(function (err) {
            });
        }
    };
    AppComponent.prototype.watchForChanges = function () {
        var _this = this;
        setInterval(function () {
            _this.fetchWorksheets();
        }, 1000);
        this.glueService.getGlueInstance()
            .then(function (glue) {
            glue.agm.methodAdded(function (method) {
                if (method.name === 'T42.BBG.GetWorksheets') {
                    _this.bloombergAvailable = true;
                    _this.fetchWorksheets();
                }
            });
            glue.agm.methodRemoved(function (method) {
                if (method.name === 'T42.BBG.GetWorksheets') {
                    _this.bloombergAvailable = false;
                    _this.currentWorksheet = null;
                    _this.currentSecurities = [];
                }
            });
        });
    };
    AppComponent.prototype.selectWorksheet = function (worksheet) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = worksheet.id;
                        _a = this;
                        return [4 /*yield*/, this.bloombergService.getWorksheetSecurities(id)];
                    case 1:
                        _a.currentSecurities = _b.sent();
                        this.currentWorksheet = worksheet;
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.selectSecurity = function (security) {
        this.glue.channels.publish({
            partyPortfolio: {
                ric: security
            }
        });
    };
    AppComponent.prototype.createWorksheet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modalRef;
            var _this = this;
            return __generator(this, function (_a) {
                this.worksheetDialogOpened = true;
                modalRef = this.modalService.open(_create_worksheet_create_worksheet_component__WEBPACK_IMPORTED_MODULE_6__["CreateWorksheetComponent"]);
                modalRef.result.then(function (worksheetName) {
                    if (worksheetName) {
                        _this.bloombergService.createWorksheet(worksheetName).then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this;
                                        return [4 /*yield*/, this.bloombergService.getWorksheets()];
                                    case 1:
                                        _a.worksheets = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                }).catch(function () {
                    console.log('modal dismissed');
                });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.appendSecurityToSheet = function (security) {
        var _this = this;
        return this.bloombergService.appendWorksheetSecurities([security], this.currentWorksheet.id)
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.bloombergService.getWorksheetSecurities(this.currentWorksheet.id)];
                    case 1:
                        _a.currentSecurities = _b.sent();
                        this.exportWorksheet(true);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AppComponent.prototype.removeSecurity = function (security) {
        var _this = this;
        // console.log(this.currentSecurities, security);
        // this.currentSecurities = this.currentSecurities.filter(s => s !== security);
        this.bloombergService.removeWorksheetSecurities([security], this.currentWorksheet.id)
            .then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); });
    };
    AppComponent.prototype.exportWorksheet = function (updateOnly) {
        if (updateOnly === void 0) { updateOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.excelAvailable) {
                    console.log('export worksheet');
                    this.excelServiceService.openSheet(this.currentWorksheet, this.currentSecurities, updateOnly);
                }
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.getSecuritiesToAppend = function () {
        var _this = this;
        return this.securities.filter(function (security) {
            return !_this.currentSecurities.find(function (cs) { return cs === security; });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('createWorksheetDialog'),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "createWorksheetDialog", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_glue_service__WEBPACK_IMPORTED_MODULE_5__["GlueService"],
            _services_excel_service_service__WEBPACK_IMPORTED_MODULE_2__["ExcelService"],
            _services_bloomberg_service__WEBPACK_IMPORTED_MODULE_1__["BloombergService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbDropdownConfig"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModal"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _services_glue_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/glue.service */ "./src/app/services/glue.service.ts");
/* harmony import */ var _services_bloomberg_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/bloomberg.service */ "./src/app/services/bloomberg.service.ts");
/* harmony import */ var _services_excel_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/excel-service.service */ "./src/app/services/excel-service.service.ts");
/* harmony import */ var _create_worksheet_create_worksheet_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-worksheet/create-worksheet.component */ "./src/app/create-worksheet/create-worksheet.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _create_worksheet_create_worksheet_component__WEBPACK_IMPORTED_MODULE_6__["CreateWorksheetComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__["NgbModule"].forRoot()
            ],
            providers: [_services_glue_service__WEBPACK_IMPORTED_MODULE_3__["GlueService"], _services_bloomberg_service__WEBPACK_IMPORTED_MODULE_4__["BloombergService"], _services_excel_service_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
            entryComponents: [_create_worksheet_create_worksheet_component__WEBPACK_IMPORTED_MODULE_6__["CreateWorksheetComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/constants/bloomberg-agm-method-names.ts":
/*!*********************************************************!*\
  !*** ./src/app/constants/bloomberg-agm-method-names.ts ***!
  \*********************************************************/
/*! exports provided: createWorksheet, getWorksheets, getWorksheetSecurities, appendWorksheetSecurities, removeWorksheetSecurities, setWorksheetSecurities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWorksheet", function() { return createWorksheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorksheets", function() { return getWorksheets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWorksheetSecurities", function() { return getWorksheetSecurities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendWorksheetSecurities", function() { return appendWorksheetSecurities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeWorksheetSecurities", function() { return removeWorksheetSecurities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setWorksheetSecurities", function() { return setWorksheetSecurities; });
var createWorksheet = 'T42.BBG.CreateWorksheet';
var getWorksheets = 'T42.BBG.GetWorksheets';
var getWorksheetSecurities = 'T42.BBG.GetWorksheetSecurities';
var appendWorksheetSecurities = 'T42.BBG.AppendWorksheetSecurities';
var removeWorksheetSecurities = 'T42.BBG.RemoveWorksheetSecurities';
var setWorksheetSecurities = 'T42.BBG.SetWorksheetSecurities';


/***/ }),

/***/ "./src/app/constants/glue4office-config.ts":
/*!*************************************************!*\
  !*** ./src/app/constants/glue4office-config.ts ***!
  \*************************************************/
/*! exports provided: glueConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glueConfig", function() { return glueConfig; });
var glueConfig = {
    gateway: {
        ws: 'ws://localhost:8385/gw',
        protocolVersion: 3
    },
    auth: {
        username: 't42demo',
        password: 't42demo'
    },
    word: false,
    excel: true,
    outlook: false,
    appManager: false,
    contexts: false
};


/***/ }),

/***/ "./src/app/create-worksheet/create-worksheet.component.html":
/*!******************************************************************!*\
  !*** ./src/app/create-worksheet/create-worksheet.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h5 class=\"modal-title\" id=\"exampleModalLabel\">Create New Worksheet</h5>\n  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">×</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form>\n    <div class=\"form-group\">\n      <label for=\"worksheetName\" class=\"col-form-label\">Worksheet Name:</label>\n      <input type=\"text\" class=\"form-control\" id=\"worksheetName\" autocomplete=\"off\" [(ngModel)]=\"worksheetName\" [ngModelOptions]=\"{standalone: true}\">\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" (click)=\"close()\">Close</button>\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"create()\">Create</button>\n</div>\n"

/***/ }),

/***/ "./src/app/create-worksheet/create-worksheet.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/create-worksheet/create-worksheet.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NyZWF0ZS13b3Jrc2hlZXQvY3JlYXRlLXdvcmtzaGVldC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/create-worksheet/create-worksheet.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/create-worksheet/create-worksheet.component.ts ***!
  \****************************************************************/
/*! exports provided: CreateWorksheetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateWorksheetComponent", function() { return CreateWorksheetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateWorksheetComponent = /** @class */ (function () {
    function CreateWorksheetComponent(activeModal) {
        this.activeModal = activeModal;
        this.isHidden = true;
        this.worksheetName = '';
    }
    CreateWorksheetComponent.prototype.ngOnInit = function () {
    };
    CreateWorksheetComponent.prototype.close = function () {
        this.activeModal.dismiss();
    };
    CreateWorksheetComponent.prototype.create = function () {
        this.activeModal.close(this.worksheetName);
        this.worksheetName = '';
    };
    CreateWorksheetComponent.prototype.show = function () {
        this.isHidden = false;
        this.result = new Promise(function (resolve) {
            setTimeout(function () { return resolve('Worksheet ' + Math.random()); }, 1000);
        });
    };
    CreateWorksheetComponent.prototype.hide = function () {
        this.isHidden = true;
    };
    CreateWorksheetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-worksheet',
            template: __webpack_require__(/*! ./create-worksheet.component.html */ "./src/app/create-worksheet/create-worksheet.component.html"),
            styles: [__webpack_require__(/*! ./create-worksheet.component.scss */ "./src/app/create-worksheet/create-worksheet.component.scss")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"]])
    ], CreateWorksheetComponent);
    return CreateWorksheetComponent;
}());



/***/ }),

/***/ "./src/app/mock-data/worksheet-and-securities.ts":
/*!*******************************************************!*\
  !*** ./src/app/mock-data/worksheet-and-securities.ts ***!
  \*******************************************************/
/*! exports provided: securities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "securities", function() { return securities; });
var securities = ['VOD LN Equity',
    'BARC LN Equity',
    'BMW GR Equity',
    'AAL LN Equity',
    'GOOGL US Equity',
    'MSFT US Equity',
    'TEAM US Equity',
    'CRM US Equity',
    'JPM US Equity',
    'FB US Equity',
    'AMZN US Equity',
    'AAPL US Equity',
    'BABA US Equity',
    'TICK Index',
    'NTES US Equity',
    'KHC US Equity',
    'NFLX US Equity',
    'TSCO LN Equity'];


/***/ }),

/***/ "./src/app/services/bloomberg.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/bloomberg.service.ts ***!
  \***********************************************/
/*! exports provided: BloombergService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BloombergService", function() { return BloombergService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _glue_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glue.service */ "./src/app/services/glue.service.ts");
/* harmony import */ var _constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/bloomberg-agm-method-names */ "./src/app/constants/bloomberg-agm-method-names.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// tslint:disable-next-line:max-line-length

var BloombergService = /** @class */ (function () {
    function BloombergService(glueService) {
        this.glueService = glueService;
    }
    BloombergService.prototype.createWorksheet = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var glue4office;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glueService.getGlueInstance()];
                    case 1:
                        glue4office = _a.sent();
                        console.log('createWorksheet ' + name);
                        return [2 /*return*/, glue4office.agm.invoke(_constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__["createWorksheet"], { name: name })
                                .then(function (result) { return result.returned._result; })];
                }
            });
        });
    };
    BloombergService.prototype.getWorksheets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var glue4office;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glueService.getGlueInstance()];
                    case 1:
                        glue4office = _a.sent();
                        return [2 /*return*/, glue4office.agm.invoke(_constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__["getWorksheets"]).then(function (result) { return result.returned.worksheets; })];
                }
            });
        });
    };
    BloombergService.prototype.getWorksheetSecurities = function (worksheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var glue4office;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glueService.getGlueInstance()];
                    case 1:
                        glue4office = _a.sent();
                        return [2 /*return*/, glue4office.agm.invoke(_constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__["getWorksheetSecurities"], { worksheetId: worksheetId })
                                .then(function (result) {
                                return result.returned.securities;
                            })];
                }
            });
        });
    };
    BloombergService.prototype.appendWorksheetSecurities = function (securities, worksheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var glue4office;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glueService.getGlueInstance()];
                    case 1:
                        glue4office = _a.sent();
                        return [2 /*return*/, glue4office.agm.invoke(_constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__["appendWorksheetSecurities"], { securities: securities, worksheetId: worksheetId })
                                .then(console.log)];
                }
            });
        });
    };
    BloombergService.prototype.setWorksheetSecurities = function (securities, worksheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var glue4office;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glueService.getGlueInstance()];
                    case 1:
                        glue4office = _a.sent();
                        return [2 /*return*/, glue4office.agm.invoke(_constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__["setWorksheetSecurities"], { securities: securities, worksheetId: worksheetId })
                                .then(console.log)];
                }
            });
        });
    };
    BloombergService.prototype.removeWorksheetSecurities = function (securities, worksheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var glue4office;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.glueService.getGlueInstance()];
                    case 1:
                        glue4office = _a.sent();
                        return [2 /*return*/, glue4office.agm
                                .invoke(_constants_bloomberg_agm_method_names__WEBPACK_IMPORTED_MODULE_2__["removeWorksheetSecurities"], { securities: securities, worksheetId: worksheetId })
                                .then(function (result) { return result.returned._result; })];
                }
            });
        });
    };
    BloombergService.prototype.fetchData = function () {
        setInterval(function () { return console.log('Fetched data successfully!'); }, 10000);
    };
    BloombergService.prototype.onData = function (callback) {
    };
    BloombergService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_glue_service__WEBPACK_IMPORTED_MODULE_1__["GlueService"]])
    ], BloombergService);
    return BloombergService;
}());



/***/ }),

/***/ "./src/app/services/excel-service.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/excel-service.service.ts ***!
  \***************************************************/
/*! exports provided: ExcelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExcelService", function() { return ExcelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _glue_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glue.service */ "./src/app/services/glue.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _bloomberg_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bloomberg.service */ "./src/app/services/bloomberg.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ExcelService = /** @class */ (function () {
    function ExcelService(glueService, bloombergService) {
        var _this = this;
        this.glueService = glueService;
        this.bloombergService = bloombergService;
        this.openedSheets = [];
        this.$securities = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.glueService.getGlueInstance()
            .then(function (glue) { return _this.glue4office = glue; })
            .catch(console.error);
    }
    ExcelService.prototype.getSecurities = function () {
        return this.$securities.asObservable();
    };
    ExcelService.prototype.setSecurities = function (newSecurities) {
        this.$securities.next(newSecurities);
    };
    ExcelService.prototype.openSheet = function (worksheet, securities, updateOnly) {
        var _this = this;
        if (securities.length === 0) {
            securities = [''];
        }
        var config = this.getExcelConfig(worksheet.name, securities);
        var openedSheet = this.openedSheets.find(function (s) { return s.worksheetId === worksheet.id; });
        if (openedSheet) {
            openedSheet.excelSheet.update(securities.map(function (ticker) { return ({ ticker: ticker }); }));
        }
        else {
            if (updateOnly) {
                return;
            }
            return this.glue4office.excel.openSheet(config)
                .then(function (sheet) {
                sheet.onChanged(function (data, _, done) {
                    _this.setSecurities(data);
                    data = data.map(function (security) { return security.ticker; });
                    _this.bloombergService.setWorksheetSecurities(data, worksheet.id);
                    done();
                });
                _this.openedSheets.push({
                    worksheetId: worksheet.id,
                    excelSheet: sheet
                });
            });
        }
    };
    ExcelService.prototype.onDataChanged = function () {
    };
    ExcelService.prototype.getExcelConfig = function (name, securities) {
        return {
            columnConfig: [
                { header: 'Securities', fieldName: 'ticker', width: 12 },
            ],
            options: {
                // clearGrid: true,
                // dataRangeName: `worksheet`,
                // inhibitLocalSave: false,
                // response: `image`,
                // topLeft: `A2`,
                // buttonRange: `A1:C1`,
                // buttonText: `Send Data`,
                workbook: name + '.xls',
                worksheet: name,
                updateTrigger: [
                    'save',
                    'row'
                ]
            },
            data: securities.map(function (ticker) { return ({ ticker: ticker }); })
        };
    };
    ExcelService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_glue_service__WEBPACK_IMPORTED_MODULE_1__["GlueService"],
            _bloomberg_service__WEBPACK_IMPORTED_MODULE_3__["BloombergService"]])
    ], ExcelService);
    return ExcelService;
}());



/***/ }),

/***/ "./src/app/services/glue.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/glue.service.ts ***!
  \******************************************/
/*! exports provided: GlueService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlueService", function() { return GlueService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/glue4office-config */ "./src/app/constants/glue4office-config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var GlueService = /** @class */ (function () {
    function GlueService() {
    }
    GlueService.prototype.getGlueInstance = function () {
        if (!this.gluePromise) {
            this.gluePromise = this.initializeGlue();
        }
        return this.gluePromise;
    };
    GlueService.prototype.initializeGlue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var glue, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"].gateway.ws = (window['glue42gd'] && glue42gd.gwUrl) || _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"].gateway.ws;
                        _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"].auth.username = (window['glue42gd'] && glue42gd.user) || _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"].auth.username;
                        console.log('Will initialize Glue with config', _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"]);
                        return [4 /*yield*/, Glue(_constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"])];
                    case 1:
                        glue = _b.sent();
                        _constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"].glue = glue;
                        _a = this;
                        return [4 /*yield*/, Glue4Office(_constants_glue4office_config__WEBPACK_IMPORTED_MODULE_1__["glueConfig"])];
                    case 2:
                        _a.glue = _b.sent();
                        window['glue'] = glue;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (!_this.glue) {
                                    reject(false);
                                }
                                resolve(_this.glue);
                            })];
                }
            });
        });
    };
    GlueService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], GlueService);
    return GlueService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\development\all-enterprise-demos\bbg-worksheet-demo\bbg-worksheet-demo\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map