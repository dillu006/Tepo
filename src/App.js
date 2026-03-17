import React, { useState, useEffect } from "react";

var COUNTRIES = [
  { name: "India", code: "+91", lang: "Telugu" },
  { name: "USA", code: "+1", lang: "English" },
  { name: "Japan", code: "+81", lang: "Japanese" },
  { name: "Germany", code: "+49", lang: "German" },
  { name: "Brazil", code: "+55", lang: "Portuguese" },
  { name: "France", code: "+33", lang: "French" }
];

var CONTACTS = [
  { name: "Ravi Kumar", lang: "Telugu", code: "+91", num: "98765 43210", color: "#4f46e5" },
  { name: "John Smith", lang: "English", code: "+1", num: "555 987 6543", color: "#0891b2" },
  { name: "Yuki Tanaka", lang: "Japanese", code: "+81", num: "90 1234 5678", color: "#dc2626" },
  { name: "Maria Santos", lang: "Portuguese", code: "+55", num: "11 98765 4321", color: "#16a34a" },
  { name: "Hans Muller", lang: "German", code: "+49", num: "170 123 4567", color: "#d97706" }
];

var RECENT = [
  { name: "Ravi Kumar", lang: "Telugu", time: "2 min ago", type: "in", color: "#4f46e5" },
  { name: "John Smith", lang: "English", time: "1 hr ago", type: "out", color: "#0891b2" },
  { name: "Yuki Tanaka", lang: "Japanese", time: "Yesterday", type: "missed", color: "#dc2626" },
  { name: "Maria Santos", lang: "Portuguese", time: "2 days ago", type: "in", color: "#16a34a" }
];

var TRANS = [
  { a: "Namaskaram! Ela unnaru?", b: "Hello! How are you?" },
  { a: "I am great, thanks!", b: "Nenu bagunnanu, dhanyavadalu!" },
  { a: "Manam repu kalusukavachha?", b: "Can we meet tomorrow?" },
  { a: "Sure, 5 PM works!", b: "Sare, sayantram 5 gantalu!" }
];

function Avatar(props) {
  return React.createElement("div", {
    style: {
      width: 44, height: 44, borderRadius: "50%",
      background: props.color || "#4f46e5",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0
    }
  }, props.name.charAt(0));
}

export default function DLingo() {
  var tabState = useState("dial");
  var tab = tabState[0];
  var setTab = tabState[1];

  var numState = useState("");
  var num = numState[0];
  var setNum = numState[1];

  var countryState = useState(COUNTRIES[0]);
  var country = countryState[0];
  var setCountry = countryState[1];

  var pickerState = useState(false);
  var picker = pickerState[0];
  var setPicker = pickerState[1];

  var callState = useState(null);
  var call = callState[0];
  var setCall = callState[1];

  var secsState = useState(0);
  var secs = secsState[0];
  var setSecs = secsState[1];

  var mutedState = useState(false);
  var muted = mutedState[0];
  var setMuted = mutedState[1];

  var transOnState = useState(true);
  var transOn = transOnState[0];
  var setTransOn = transOnState[1];

  var feedState = useState([]);
  var feed = feedState[0];
  var setFeed = feedState[1];

  var tIdxState = useState(0);
  var tIdx = tIdxState[0];
  var setTIdx = tIdxState[1];

  var typingState = useState(false);
  var typing = typingState[0];
  var setTyping = typingState[1];

  var searchState = useState("");
  var search = searchState[0];
  var setSearch = searchState[1];

  useEffect(function() {
    if (!call) return;
    var t = setInterval(function() {
      setSecs(function(s) { return s + 1; });
    }, 1000);
    return function() { clearInterval(t); };
  }, [call]);

  useEffect(function() {
    if (!call || !transOn) return;
    var t = setTimeout(function() {
      setTyping(true);
      setTimeout(function() {
        setTyping(false);
        setFeed(function(f) {
          return [TRANS[tIdx % TRANS.length]].concat(f).slice(0, 5);
        });
        setTIdx(function(i) { return i + 1; });
      }, 1400);
    }, 2800);
    return function() { clearTimeout(t); };
  }, [call, feed, transOn, tIdx]);

  function fmt(s) {
    var m = String(Math.floor(s / 60)).padStart(2, "0");
    var sec = String(s % 60).padStart(2, "0");
    return m + ":" + sec;
  }

  function dialBtn(d) {
    setNum(function(n) { return n.length < 12 ? n + d : n; });
  }

  function startCall(info) {
    setCall(info);
    setSecs(0);
    setFeed([]);
    setTIdx(0);
    setMuted(false);
    setTyping(false);
  }

  function endCall() {
    setCall(null);
    setSecs(0);
  }

  var filtered = CONTACTS.filter(function(c) {
    return c.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  var S = {
    page: { background: "#f1f5f9", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", fontFamily: "system-ui,sans-serif", paddingTop: 24 },
    card: { width: 360, background: "#fff", borderRadius: 28, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" },
    header: { background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", padding: "28px 24px 20px" },
    callPage: { background: "#0f172a", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "system-ui,sans-serif" },
    callCard: { width: 360, background: "#1e293b", borderRadius: 28, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" },
    callHeader: { background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)", padding: "32px 24px 24px", textAlign: "center" }
  };

  if (call) {
    return (
      <div style={S.callPage}>
        <div style={S.callCard}>
          <div style={S.callHeader}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar name={call.name} color={call.color} />
            </div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginTop: 12 }}>{call.name}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>{call.code} {call.num}</div>
            <div style={{ color: "#7dd3fc", fontSize: 13, marginTop: 6 }}>Telugu to {call.lang}</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 600, marginTop: 10 }}>{fmt(secs)}</div>
          </div>

          <div style={{ padding: "16px 20px", minHeight: 200, background: "#0f172a" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: "#94a3b8", fontSize: 11, fontWeight: 700 }}>LIVE TRANSLATION</span>
              <button
                onClick={function() { setTransOn(function(t) { return !t; }); }}
                style={{ background: transOn ? "#16a34a" : "#475569", color: "#fff", border: "none", borderRadius: 20, padding: "3px 12px", fontSize: 11, cursor: "pointer" }}>
                {transOn ? "ON" : "OFF"}
              </button>
            </div>

            {typing && (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: "8px 14px", marginBottom: 8, display: "inline-block" }}>
                <span style={{ color: "#60a5fa", fontSize: 18 }}>. . .</span>
              </div>
            )}

            {feed.map(function(m, i) {
              return (
                <div key={i} style={{ marginBottom: 10, opacity: Math.max(1 - i * 0.18, 0.2) }}>
                  <div style={{ background: "#1e293b", borderRadius: "12px 12px 12px 3px", padding: "8px 12px", display: "inline-block", maxWidth: "85%", marginBottom: 4 }}>
                    <div style={{ color: "#e2e8f0", fontSize: 13 }}>{m.a}</div>
                  </div>
                  <br />
                  <div style={{ background: "#1d4ed8", borderRadius: "3px 12px 12px 12px", padding: "8px 12px", display: "inline-block", maxWidth: "85%" }}>
                    <div style={{ color: "#bfdbfe", fontSize: 13 }}>{m.b}</div>
                  </div>
                </div>
              );
            })}

            {feed.length === 0 && !typing && (
              <div style={{ color: "#475569", fontSize: 13, textAlign: "center", marginTop: 40 }}>
                Translation will appear here...
              </div>
            )}
          </div>

          <div style={{ padding: "16px 24px 28px", background: "#1e293b" }}>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={function() { setMuted(function(m) { return !m; }); }}
                  style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: muted ? "#1d4ed8" : "#334155", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>
                  {muted ? "MUTED" : "MIC"}
                </button>
                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 6 }}>{muted ? "Unmute" : "Mute"}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#334155", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>
                  SPK
                </button>
                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 6 }}>Speaker</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={function() { setTransOn(function(t) { return !t; }); }}
                  style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: transOn ? "#1d4ed8" : "#334155", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 11 }}>
                  TRN
                </button>
                <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 6 }}>Translate</div>
              </div>
            </div>
            <button
              onClick={endCall}
              style={{ width: "100%", padding: 16, background: "#dc2626", color: "#fff", border: "none", borderRadius: 16, fontSize: 16, cursor: "pointer", fontWeight: 700 }}>
              End Call
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.header}>
          <div style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>D Lingo</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Live Call Translator</div>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
          {[["dial", "Dial"], ["contacts", "Contacts"], ["recent", "Recent"]].map(function(item) {
            return (
              <button
                key={item[0]}
                onClick={function() { setTab(item[0]); }}
                style={{ flex: 1, padding: "13px 0", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: tab === item[0] ? "#1d4ed8" : "#94a3b8", borderBottom: tab === item[0] ? "2px solid #1d4ed8" : "2px solid transparent" }}>
                {item[1]}
              </button>
            );
          })}
        </div>

        {tab === "dial" && (
          <div style={{ padding: "20px 24px 28px" }}>
            <button
              onClick={function() { setPicker(function(p) { return !p; }); }}
              style={{ width: "100%", padding: "12px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: 14 }}>
              <span>{country.name} {country.code}</span>
              <span style={{ color: "#94a3b8" }}>v</span>
            </button>

            {picker && (
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 10, maxHeight: 180, overflowY: "auto" }}>
                {COUNTRIES.map(function(c) {
                  return (
                    <button
                      key={c.name}
                      onClick={function() { setCountry(c); setPicker(false); }}
                      style={{ width: "100%", padding: "11px 16px", border: "none", background: country.name === c.name ? "#eff6ff" : "none", cursor: "pointer", textAlign: "left", fontSize: 14, display: "flex", gap: 10 }}>
                      <span style={{ flex: 1 }}>{c.name}</span>
                      <span style={{ color: "#64748b" }}>{c.code}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <div style={{ background: "#eff6ff", borderRadius: 10, padding: "8px 14px", marginBottom: 14, fontSize: 13, color: "#1d4ed8" }}>
              Telugu to {country.lang} - Auto detected
            </div>

            <div style={{ textAlign: "center", padding: "10px 0 14px", minHeight: 50 }}>
              <span style={{ fontSize: 26, fontWeight: 300, color: num ? "#0f172a" : "#cbd5e1", letterSpacing: 2 }}>
                {num ? country.code + " " + num : "Enter number"}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(function(d) {
                return (
                  <button
                    key={d}
                    onClick={function() { dialBtn(d); }}
                    style={{ padding: "15px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 20, cursor: "pointer", fontWeight: 500, color: "#0f172a" }}>
                    {d}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={function() {
                  if (num) {
                    startCall({ name: country.code + " " + num, lang: country.lang, code: country.code, num: num, color: "#1d4ed8" });
                  }
                }}
                style={{ flex: 1, padding: 16, background: num ? "#16a34a" : "#86efac", color: "#fff", border: "none", borderRadius: 16, fontSize: 16, cursor: num ? "pointer" : "not-allowed", fontWeight: 700 }}>
                Call
              </button>
              <button
                onClick={function() { setNum(function(n) { return n.slice(0, -1); }); }}
                style={{ padding: "16px 22px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, fontSize: 18, cursor: "pointer" }}>
                X
              </button>
            </div>
          </div>
        )}

        {tab === "contacts" && (
          <div style={{ padding: "16px 20px" }}>
            <input
              value={search}
              onChange={function(e) { setSearch(e.target.value); }}
              placeholder="Search contacts..."
              style={{ width: "100%", padding: "10px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 14, marginBottom: 12, boxSizing: "border-box", outline: "none" }} />
            {filtered.map(function(c, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <Avatar name={c.name} color={c.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#0f172a", fontSize: 15 }}>{c.name}</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>{c.code} {c.num} - {c.lang}</div>
                  </div>
                  <button
                    onClick={function() { startCall(c); }}
                    style={{ width: 44, height: 44, background: "#16a34a", border: "none", borderRadius: "50%", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    Call
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === "recent" && (
          <div style={{ padding: "16px 20px" }}>
            {RECENT.map(function(r, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <Avatar name={r.name} color={r.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#0f172a", fontSize: 15 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: r.type === "missed" ? "#dc2626" : r.type === "in" ? "#16a34a" : "#64748b" }}>
                      {r.type === "missed" ? "Missed" : r.type === "in" ? "Incoming" : "Outgoing"} - {r.time}
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{r.lang}</div>
                  </div>
                  <button
                    onClick={function() { startCall({ name: r.name, lang: r.lang, color: r.color, code: "", num: "" }); }}
                    style={{ width: 44, height: 44, background: "#1d4ed8", border: "none", borderRadius: "50%", color: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    Call
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
