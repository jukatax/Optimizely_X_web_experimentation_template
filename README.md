# Optimizely X Web Experimentation temlpate
An ES2015 template to use in your `Optimizely X Web Experimentation` tests

## How to: ##
### Using the template: ###
* Replace every instance of `_000` with your test number in both the shared script and the variant script files
* If you need to track conversions on the confirmation page using custom conversions then include your order confirmation page in your test as tes page with immediate invocation. On that page invoke the tracking code only `t_[testNumberHere].tracking();` .Certainly it can be done with creating a new page with polling function as a trigger for the conversion
* Write your variation code in `global_shared_template.es6` , use an ES6 to ES5 transpiler in your favourite IDE, minify the generated `.js` file and put that code in the `Shared Code` JavaScript tab in the Optimizely editor.
* According to your variations write your variation code in each of the variation sections v_0, v_1, v_2 etc in this same file - `global_shared_template.es6`
* In order to trigger the correct variation you need to set the correct variation "level" in  the `variation.js` for each of your variations and put that file in your test page js tab


### Conversions and tracking ###
* Every time the test runs it drops a cookie with the test name. This cookie can be used on the order confirmation page to trigger custom conversions
* Every time a conversion is fired you can pass true/false if you want a cookie dropped/removed with the conversion name. No parameter means no cookie will be set/removed

### Debugging ###
* Logs will be available in console if there is a url parameter `_qa` or `test` or a cookie with "debug=true". (IE11+ with color background)

### Hiding the page ###
* Depending on your implementation you should be able to hide the page while your changes have been delivered - `hideTestElements()` 
* there is a css animated loader graphics which you can modify to your tastes - `#yuliloader` - the loader is displayed while your changes are being delivered and removed when done
* all the above is possible if your implementation is correct - Optimizely tag in the `head` tag and chosen `synchronous timing` (set in each variation's js tab) code delivery

Thanks!




