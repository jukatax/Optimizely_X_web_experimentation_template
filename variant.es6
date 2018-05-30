/**
 * Template Created by yuliyanyordanov on 25/07/17.
 * v4.2.1
 * template runs on all test pages
 * replace the _000 with your _testNumber
 * set the level for the test control/v_1/v_2/v_3 etc.
 */
/*jshint esversion:6*/
let level_000 = "v_1";
let prevTS_000 = 0;
let poll4elems_000 = (timestamp) => {
    "use strict";
    if (prevTS_000 !== 0) {
        console.log("\t%c=== %s- Polling time : %dms ===\t", t_000.logStyles_poll, t_000.testName,timestamp - prevTS_000);
    }
    prevTS_000 = timestamp;
    if(!t_000.countStart){t_000.countStart = timestamp;}
    if (!t_000.poller(t_000.pollForElements)) {
        if(timestamp-t_000.countStart<t_000.countMax) {
            t_000.hideTestElements();
            window.requestAnimationFrame(poll4elems_000);
        }else{
            t_000.showTestElements();
            console.log("\t%c=== %s poll failed - show content & disable tracking ===",t_000.logStyles_error,t_000.testName);
            window.optimizely.push({
                "type": "disable",
                "scope": "tracking"
            });
            return false;
        }
    } else {
        t_000.init(level_000);
    }
};//poll4elems_000
if(!t_000.isConfirmationPage) {
    t_000.hideTestElements();
    if(t_000.imagesToPreload.length){t_000.preloadImage(t_000.imagesToPreload);}
    window.requestAnimationFrame(poll4elems_000);
}