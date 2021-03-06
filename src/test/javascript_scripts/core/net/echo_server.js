/*
 * Copyright 2011-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

load('vertx.js')
load('test_utils.js')

var tu = new TestUtils();

var server = vertx.createNetServer();

var h = function(sock) {
  tu.checkThread();
  sock.dataHandler(function(data) {
    tu.checkThread();
    sock.write(data);
  })
};

server.connectHandler(h);

server.listen(1234, 'localhost');

tu.appReady();

function vertxStop() {
  tu.checkThread();
  server.close(function() {
    tu.checkThread();
    tu.appStopped();
  });
}
