---
title: 'Angular Browser Module'
author: 'Sanket Maru'
date: 2020-03-25T00:00:00.000Z
excerpt: 'Why you should import BrowserModule carefully in your application.'
published: true
hero: ./assets/images/browser-module.png
slugs:
    - ___UNPUBLISHED___ke6pr7n2_kQnWbHyaGLtwNclGRQGp8vN8OnfhQsol

---
# Problem Statement

In one of the existing projects i worked on, i was given a task of improving the performance of an Angular App. 

First thing i looked on is if the major routing modules are lazily loaded or not. Sometimes developers make basic mistakes. 

As i was navigating through the code found, i found none of the modules are lazy loaded due to some x reason. This was the chance to improve upon as client would be un-necessary downloading the code he would never want to go on.

As i extracted the components and created a lazy module, i imported *MaterialDesignModule* from the codebase which would imply it had all the material library related modules. Once imported my app would stop working and below error could be see on console.

>Error: BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.**

This error is self explanatory and tells us that BrowserModule has already been loaded and it does not need to be loaded again. if its needed in any other module or a lazy loaded module then *CommonModule* should be imported. 

# Solution

I tried to find the BrowserModule, but it had been imported only once. So there is another module [BrowserAnimationsModule](https://angular.io/api/platform-browser/animations/BrowserAnimationsModule) which exports BrowserModule with additional providers useful for animations.

Importing BrowserAnimationsModule in your app module will mean that all your module will have animation enabled and you are ready to use.

To solve the error remove BrowserAnimationsModule from any other modules and import it in AppModule.

## AppModule
```javascript
@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
``` 

## LazyModule
```javascript
@NgModule({
    declarations: [LazyComponent],
    imports: [
      LazyRoutingModule,
      // Dont import BrowserAnimationsModule inside child module
      // BrowserAnimationsModule
    ],    
})
```

Other problem was that the MaterialDesignModule in codebase had mixed responsibilities as it imported BrowserAnimationsModule too. 

> A bit of refactoring and cleaning the code is a part of developer journey.

Code was refactored to have MaterialDesignModule just consisting of Material modules and main AppModule has BrowserModule, BrowserAnimationsModule.

Also *CommonModule* needed to be imported in Lazy module as it required *ngIf directive. 

Though if you feel that any of your module does not need animation, Angular provides a clean way of disabling it by importing [NoopAnimationsModule](https://angular.io/api/platform-browser/animations/NoopAnimationsModule)


I will post more on [Animations](https://angular.io/guide/animations) in Angular in my upcoming posts