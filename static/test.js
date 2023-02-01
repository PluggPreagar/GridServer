let grid = new Grid();
let value_current = "";
let eTestLog = document.getElementById("testLog");
let test_current = "";
let test_count_fail = 0;
let test_count_total = 0;

function logTest(msg) {
  eTestLog.value += msg + "\n";
  eTestLog.scrollTop = eTestLog.scrollHeight;

}

function logOk(msg) {
  test_count_total = test_count_total + 1;
  logTest(test_count_total + "-" + test_count_fail + "  OK: " + msg);
}

function logFail(msg, is, should) {
  test_count_total = test_count_total + 1;
  test_count_fail = test_count_fail + 1;
  let logMsg = test_count_total + "-" + test_count_fail + "  FAIL: " + msg + (is || should ? "( IS: " + is + " <> SHOULD: " + should + " )" : "");
  log(logMsg);
  logTest(logMsg);
  console.error(logMsg);
}

function assertChk(cond, msgOk, msgFail, is, should) {
  if (cond) {
    logOk(msgOk);
  } else {
    logFail(msgFail, is, should);
  }
}

function assertNotNull(is, msg) {
  assertChk(is, msg, msg);
}

function assertNull(is, msg) {
  assertChk(!is, msg, msg);
}


function assertId(id, msg) {
  e = document.getElementById(id);
  assertChk(e, (msg ?? " found ID") + "(\"" + id + "\") ", (msg ?? " miss ID") + "(\"" + id + "\") ");
  return e;
}

function assertNotId(id, msg) {
  e = document.getElementById(id);
  assertChk(!e, (msg ?? " free ID") + "(\"" + id + "\") ", (msg ?? " unexpected ID") + "(\"" + id + "\") ");
  return e;
}

function assertEq(is, should, msg) {
  assertChk(is == should, msg + " (" + is + ")", msg, is, should);
}

function testStart(name) {
  logTest("---------------------------");
  logTest("   " + name);
  logTest("---------------------------");
}

