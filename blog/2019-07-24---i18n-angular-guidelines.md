---
title: Guidelines for handling i18n in Angular
author: Sanket Maru
date: 2019-07-24
hero: ./images/small.jpeg
excerpt: This post contains a set of statements on how to tag particular element with i18n and cases developer needs to consider while coding.
---

**A brief overview** 

Developers come across the scenarios what if 

* Whitespaces are added to your string and how those strings gets translated.  
* How are numbers , dates, percentages translated. 
* How can we give i18n texts for button. Whats the best approach so translation files doesn't have duplicate entries.

Angular supports [Internationalization](https://angular.io/guide/i18n) very well and the official documentation has setup and different cases where i18n should be handled. 

This post covers the scenarios where developer needs to take care of i18n whenever new code is submitted. 

This post is for both the developers and ones who review the Pull Requests if below recommendataions are not met

**Recommendations**

* Each visible English string in HTML code should be tagged with i18n

```html
<h2 i18n="Page Heading"> Examples of Internationalization(i18n) </h2>
```
Mostly all such visibile lines should be placed in HTML and not in TS files.

* Along with i18n tag it is recommended to add a meaning and description to a string which helps the translation team to translate in a better way

```html
<ul>
  <li i18n="First Name|First Name of candidate">First Name</li>
  <li i18n="Middle Name|Middle Name of candidate">Second Name</li>
  <li i18n="Last Name|Last Name of candidate">Last Name</li>
</ul>
```

We will consider a case where just i18n tag is given and when meaning and description is also given for the same type of html code. 

```html
<ul>
  <li i18n>First Name</li>
  <li i18n>Middle Name</li>
  <li i18n>Last Name</li>
</ul>

```

```html
<ul>
  <li i18n="First Name|First Name of candidate">First Name</li>
  <li i18n="Middle Name|Middle Name of candidate">Second Name</li>
  <li i18n="Last Name|Last Name of candidate">Last Name</li>
</ul>
```

When messages file are generated for each of them entries are added. So as for the above snippets same code is there but it adds un-necessary entries in messages files. This marks as a first red flag for developer to check for similar code in the code base and have a single entry for them.

* Apply i18n tag at the parent tag when you have nested tags 

```html
<div i18n="Signup success|Success message for signup ">Your signup is successfull.
<span><strong>Please verify your email address</strong> to continue.</span>
</div>
```
Enclosing at parent tag ensures that text is properly translated as a single sentence would
have a different meaning as compared when broken into multiple sentences. 

* Angular takes care of interpolation when dynamic parameters are found with in the string

```html
<div i18n="License status|Different statuses of licenses">License {{ licenseStatus }}</div>
```

* It is recommended that you do not use colon character ( : ) in strings. Some languages do not convert it.
 

* If you have a string with `{{ firstName }} {{ lastName }}`, it needs to be internationalized using i18n tag as some locales have different rules for formatting names.
 

* Angular pipes needs to be used to format numbers, dates, and percentages. 
 

* Whitespaces are evil. Ensure whitespaces are not added to your string as " demo text" and "demo text " will result into two things to translate


* Buttons
Over the complete application most of the button texts are similar. So buttons should be tagged with a static id , so that there are no duplicate translations and similar ids are used all over the codebase. 

Below are some of the button which are commonly used and an example to use the static ids.

```html
<button (click)="cancel()" i18n="Cancel forgot password|secondary button@@btnCancel">Cancel</button>
```
```
| Button        | Id            |
| ------------- |:-------------:|
| Cancel        | btnCancel     |
| Close         | btnClose      |
| OK            | btnOk         |
| Save          | btnSave       |
| Yes           | btnYes        | 
```
Hope this article helps to include the points in the UI guidelines on i18n. 