/**
 * Template Created by yuliyanyordanov on 25/07/17.
 * v4.1
 * template runs on all test pages
 * replace the _000 with your _testNumber
 * write your variations in the corresponding function name - v_0/1/2/3/4 where v_0 is control
 * write your tracking - tracking()
 */
/*jshint esversion:6*/
window.startTime_000 = new Date();
//=====================================
class test_000{
    constructor(){
        //SET TEST NAME, VARIATION AND ELEMENTS TO POLL FOR HERE
        this.testName = "ab_000";
        this.confPageRegExp = new RegExp("checkout\/OrderConfirmation" , "i"); // order confirmation page to detect with regexp
        this.isConfirmationPage = this.confPageRegExp.test(window.location.href);
        this.pollForElements = ["header","#someId"];
        //SET images to be PRELOADED array of strings, LEAVE EMPTY IF NOT REQUIRED
        this.imagesToPreload = ["/somePath/toImage.jpg"];
        //EVENT names
        this.eventName = "test_event";
        this.eventName_2 = "test_event_2";
        //SET TEST POLL TIMEOUT
        this.countStart = 0;
        this.countMax = 6000; //6 seconds ,test and set max countdown interval to reveal the page
        //Log enable and log styles
        this.logs = Boolean(window.location.search.match(/(test|_qa)/i));
        this.logStyles = "background:#009e9f;color:#fff;";
        this.logStyles_poll = "background:#00539f;color:#fff;";
        this.logStyles_error = "background:#f00;color:#fff;";
        this.logStyles_rendered = "background:#168229;color:#fff;";
        this.logStyles_tracking = "background:#949f00;color:#fff;";
    }

    hideTestElements(){
        if(!document.getElementById(this.testName+"styles")) {
            if(this.logs===true){
                console.log("\t%c=== %s- hideTestElements() : hiding content ===",this.logStyles,this.testName);
            }
            let style = document.createElement("style");
            style.id = this.testName + "styles";
            style.textContent = "body, body > * , body div[style*=visible]{ visibility : hidden!important;}"+
                "body .loading .load-message,body .load-message{visibility:visible;display:block;}" +
                "body #yuliloader,body #yuliloader:after {border-radius: 50%;width: 10em;height: 10em;}" +
                "#yuliloader{position: fixed; z-index : 999; top: calc(50% - 25px); left: calc(50% - 25px);width : 50px;height : 50px;}"+
                "html body #yuliloader {display : block!important; visibility : visible!important; margin:60px auto;font-size:10px;text-indent: -9999em;border-top: 1.1em solid rgba(0, 83, 159, 0.2);border-right: 1.1em solid rgba(0, 83, 159, 0.2);border-bottom: 1.1em solid rgba(0, 83, 159, 0.2);border-left: 1.1em solid #00539f;-webkit-transform:translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation:load8 1.1s infinite linear;animation: load8 1.1s infinite linear;}"+
                "@-webkit-keyframes load8 {"+
                    "0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}"+
                    "100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}"+
                "}"+
                "@keyframes load8 {"+
                    "0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}"+
                    "100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}"+
                "}";
            document.head.appendChild(style);
            let loader = document.createElement("div");
            loader.id = "yuliloader";
            window.appendLoader = function(){
                if(!document.body){
                    window.requestAnimationFrame(window.appendLoader);
                }else{
                    if(!document.getElementById("yuliloader")){document.body.appendChild(loader);}
                }
            };
            window.appendLoader();
        }else{
            if(this.logs===true){
                console.log("\t=== %s- hideTestElements() : content already hidden ===",this.testName);
            }
        }
    }//hideTestElements

    showTestElements(){
        if(this.logs===true){
            console.log("\t%c=== %s- showTestElements() : Showing content ===",this.logStyles,this.testName);
        }
        if(document.getElementById(this.testName+"styles")){document.head.removeChild(document.getElementById(this.testName+"styles"));}
        if(document.getElementById("yuliloader")){document.body.removeChild(document.getElementById("yuliloader"));}
        //=== Log rendering time
        if(this.logs===true){
            window.endTime_000 = new Date();
            console.log("\t%c=== %s rendered in: %dms ===\t", this.logStyles_rendered ,this.testName, (window.endTime_000 - window.startTime_000));
        }
    }//showTestElements

    init(lvl){
        //let vm = this;
        try {
            let promise = new Promise((resolve,reject)=>{
                let changesDone = this.makeChanges(lvl);
                if(changesDone && changesDone === true) {
                    resolve(true);
                }else if(!changesDone || changesDone === false){
                    throw false;
                }
            });
            promise.then((changeDone)=>{
                if(changeDone === true){
                    this.tracking();
                }
            } , ()=>{
                console.log("\t%c=== %s- init() : makeChanges() promise returned false ===",this.logStyles_error,this.testName);
                window.optimizely.push({
                    "type": "disable",
                    "scope": "tracking"
                });
            });
        }catch(e){
            console.log("\t%c=== %s- init() : Error during rendering change: %s ===",this.logStyles_error,this.testName,e);
            window.optimizely.push({
                "type": "disable",
                "scope": "tracking"
            });
        }finally{
            if(this.logs===true){
                console.log("\t%c=== %s- init() :calling showTestElements()... ===",this.logStyles,this.testName);
            }
            this.showTestElements();
        }
    }//init

    /*================================================================================
     * @preloadImage(a) -  preload image to the DOM after hiding the page and before starting to poll
     * @param a {ARRAY OF STRINGS}  - image source
     * @return  NA
     ================================================================================*/
    preloadImage(a){
        let preloaded_image = {};
        a.forEach(function(val,ind){
            preloaded_image[ind] = document.createElement("img");
            preloaded_image[ind].id = "preloaded_img_"+ind;
            preloaded_image[ind].setAttribute("src", val);
        });
        if(this.logs===true){
            console.log("\t%c=== %s- preloadImage() : Pre-loading images finished ===",this.logStyles,this.testName);
        }
    }//preloadImage

    /* ================================================================================
     * @poller() -  poll for the required elements to be on the page
     * @return  Boolean
     ================================================================================*/
    poller(){
        let elemsArr = [];
        let vm = this;
        vm.pollForElements.map(function(val,ind){
            !document.querySelectorAll(vm.pollForElements[ind]).length ? elemsArr.push(1) : null;
        });
        return !Boolean(elemsArr.length);
    }//poller

    /* ================================================================================
     * @triggerOptlyEvent(eventName) -  trigger opitmizely event and drops 1hr cookie with the event name
     * @param eventName {STRING}  - the name of the event to be triggered
     * @param setRemCookie {BOOLEAN}  - true : set cookie / false : remove cookie / N/A : do nothing
     * @return  N/A
     ================================================================================*/
    triggerOptlyEvent(eventName,setRemCookie){
        window.optimizely.push({
            type: "event",
            eventName: eventName
        });
        if(setRemCookie && setRemCookie === true){
            this.setSessionCookie(eventName,"true");
        }else if(setRemCookie && setRemCookie === false){
            this.expireCookie(eventName);
        }
    }//clickListener

    //========================= HELPER FUNCTIONS BELOW THIS LINE ======================

    /* ================================================================================
     * @setSessionCookie() -  set a 1hr cookie name and value
     * @param name {string}
     * @param val {string}
     * @return  NA
     ================================================================================*/
    setSessionCookie(name,val){
        let d= new Date();
        d.setTime(d.getTime() + 1000*60*60*24*0.084);
        document.cookie = name+'='+val+';path=/;expires='+d.toUTCString()+';';
    }//setSessionCookie

    /*  ================================================================================
     * @expireCookie() -  set a cookie to expire, target it by name
     * @param name {string}
     * @return  NA
     ================================================================================*/
    expireCookie(name){
        document.cookie = name+'=true;path=/;expires=Thu, 18 Dec 2016 12:00:00 UTC;';
    }//expireCookie

    /* ================================================================================
     * @addStyles() -  add custom styles the document head
     * @param styles {string} - styles to add
     * @param styleId {string}
     * @return  NA
     ================================================================================*/
    addStyles(styles,styleId){
        let style = document.createElement("style");
        style.id = this.testName + "" + styleId;
        style.textContent = styles;
        document.head.appendChild(style);
    }//addStyles
    //============================ END HELPER FUNCTIONS ==============================

    //========================= VARIATION SCRIPTS BELOW ==============================
    // ######## control
    v_0(level){

    }//v_0
    // ######## variation 1
    v_1(level){

    }//v_1
    // ######## variation 2
    v_2(level){

    }//v_2
    // ######## variation 3
    v_3(level){

    }//v_3
    // ######## variation 4
    v_4(level){

    }//v_4
    //END VARIATION SCRIPTS

    //===================================== TRACKING =================================
    tracking(){
        let wloc = window.location.href;
        let track = {};
        let vm = this;

        track.elmInView = this.pollForElements[1]; //used for Impression tracking

        track.clickTrackSnglElem = [{selector : "#ddl-basket" , evName : this.eventName}]; // array of objects {selector : "css_selector" , evName : this.eventName}, leave empty if no click tracking required
        track.clickTrackMltplElem = [{selector : "#stamps li a" , evName : this.eventName_2}]; // array of objects {selector : "css_selector" , evName : this.eventName_2}, leave empty if no click tracking required

        track.elmsConf = "#Basket-total-cost"; // used to track AOV on confirmation page

        track.onEvent = navigator.userAgent.match(/(android|mobile|iphone|ipad)/i) ? 'click' : "mousedown";

        track.docEl = document.documentElement;
        track.body = document.body;
        //=== tracking confirmation page - replace `orderConfirmation` with the partial url of your order confirmation page ===
        if (wloc.match(/orderConfirmation/i) && document.cookie.match(this.testName + "=")) {
            window.poll4elementsConf_000 = function () {
                if (!(document.querySelectorAll(track.elmsConf).length && window.optimizely)) {
                    setTimeout(window.poll4elementsConf_000, 300);
                } else {
                    window.optimizely = window.optimizely || [];
                    //==============================================================
                    // tack aov
                    //==============================================================
                    /*var aov = parseInt(parseFloat(document.querySelector(track.elmsConf).textContent) * 100);
                     window.optimizely.push({
                     type: "event",
                     eventName: "trackRevenue",
                     tags: {
                     "revenue": aov
                     }
                     });*/
                    //==============================================================
                    // track confirmation page
                    //==============================================================
                    vm.triggerOptlyEvent("confirmationPage");
                    //==============================================================
                    // track confirmation after interaction with changed element
                    //==============================================================
                    if (document.cookie.match(vm.eventName)) {
                        vm.triggerOptlyEvent("checkoutAfterClick",false);
                    }
                    if (document.cookie.match(vm.eventName_2)) {
                        vm.triggerOptlyEvent("checkoutAfterClick_other",false);
                    }
                    //==============================================================
                    //====================  end tracking code  =====================
                    //==============================================================
                    vm.expireCookie(vm.testName);
                }
            };
            window.poll4elementsConf_000();
        }
        //=== tracking test page - replace `orderConfirmation` with the partial url of your order confirmation page ===
        else if (!wloc.match(/orderConfirmation/i)) {
            window.optimizely = window.optimizely || [];
            // tracking test page ===========
            if(vm.logs===true){
                console.log("\t%c=== %s- tracking() : Tracking clicks now ===",vm.logStyles_tracking,vm.testName);
            }

            // 1 - track.clickTrackSnglElem - single event on a single element
            if(track.clickTrackSnglElem.length) {
                track.clickTrackSnglElem.map( (val, ind) => {
                    if(document.querySelector(track.clickTrackSnglElem[ind].selector)) {
                        //document.querySelector(track.clickTrackSnglElem[ind].selector).removeEventListener(track.onEvent, this.triggerOptlyEvent.bind(this,track.clickTrackSnglElem[ind].evName), true);
                        document.querySelector(track.clickTrackSnglElem[ind].selector).addEventListener(track.onEvent, this.triggerOptlyEvent.bind(this, track.clickTrackSnglElem[ind].evName, true), true);
                    }
                });
            }

            // 2 - track.clickTrackMltplElem - same event on multiple elements of same css selector
            if(track.clickTrackMltplElem.length) {
                track.clickTrackMltplElem.map((val,ind) => {
                    let clickers = document.querySelectorAll(track.clickTrackMltplElem[ind].selector);
                    if(document.querySelector(track.clickTrackMltplElem[ind].selector)) {
                        Array.prototype.forEach.call(clickers, function (val2, ind2) {
                            //clickers[ind].removeEventListener(track.onEvent, this.triggerOptlyEvent.bind(this,track.clickTrackMltplElem[ind].evName , false), true);
                            clickers[ind2].addEventListener(track.onEvent, this.triggerOptlyEvent.bind(this, track.clickTrackMltplElem[ind].evName, true), true);
                        });
                    }
                });
            }
            //end tracking code =================
        }
    }//tracking

    /* ================================== RUN THE CHANGES ============================
     * @makeChanges(level) -  call the appropriate function for the changes
     * @param level {string} - the variant/control name
     * @return  {Boolean} - true if code for changes ran successfully, false otherwise
     ================================================================================*/
    makeChanges(level){
        this.setSessionCookie(this.testName,'true');
        if(this.logs===true){
            console.log("\t%c=== %s- makeChanges() : variation : %s ===",this.logStyles,this.testName,level);
        }
        //control
        if(level === "control"){
            this.v_0(level);
            return true;
        }
        //experiment 1
        else if(level === "v_1"){
            this.v_1(level);
            return true;
        }
        //experiment 2
        else if(level === "v_2"){
            this.v_2(level);
            return true;
        }
        //experiment 3
        else if(level === "v_3"){
            this.v_3(level);
            return true;
        }
        //experiment 4
        else if(level === "v_4"){
            this.v_4(level);
            return true;
        }else{
            return false;
        }
    }//makeChanges

}//class test_000
window.t_000 = new test_000();
