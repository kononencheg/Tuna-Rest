/**
 * TUNA FRAMEWORK
 *
 * Copyright (c) 2012, Sergey Kononenko
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * * Names of contributors may be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL SERGEY KONONENKO BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @namespace
 */
var rest = {};


/**
 * @type {string}
 */
rest.VERSION = '0.0.1';


/**
 * @param {!rest.IMethodFactory} factory Фабрика методов.
 */
rest.setMethodFactory = function(factory) {
  rest.__methodFactory = factory;
};


/**
 * @param {!net.factory.IRequestFactory} factory Фабрика запросов.
 */
rest.setRequestFactory = function(factory) {
  rest.__requestFactory = factory;
};


/**
 * @param {string} name Имя метода.
 * @return {!rest.IMethod} Объект вызова метода.
 */
rest.createMethod = function(name) {
  if (rest.__methodFactory !== null) {
    var method = rest.__methodFactory.createMethod(name);
    if (method !== null) {
      return method;
    }
  }

  return new rest.Method(rest.__requestFactory, name);
};


/**
 * @param {string} name Имя метода REST-API.
 * @param {!Object} args Аргументы.
 * @param {function(string)=} opt_callback Обработчик результата выполнения.
 */
rest.call = function(name, args, opt_callback) {
  rest.createMethod(name).call(args, function(data) {
    if (opt_callback !== undefined) {
      opt_callback(data);
    }
  });
};


/**
 * @type {rest.IMethodFactory}
 */
rest.__methodFactory = null;


/**
 * @type {!net.factory.IRequestFactory}
 */
rest.__requestFactory = new net.factory.RequestFactory();
