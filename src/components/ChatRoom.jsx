import { useState, useEffect } from "react";
import { auth, loginWithGoogle, loginAnonymously, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Cek login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Ambil pesan real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.uid,
      displayName: user.displayName || "Stranger",
      photoURL: user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky",
      createdAt: serverTimestamp()
    });
    setMessage("");
  };

  return (
    <div className="bg-zinc-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-5">
      <h2 className="text-2xl font-bold text-center mb-4 text-white flex items-center justify-center gap-3">
        Community Chat
      </h2>

      {/* Header user */}
      {user && (
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <div className="flex items-center gap-3">
            <img 
              src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"} 
              alt="avatar" 
              className="w-10 h-10 rounded-full border border-gray-600" 
            />
            <span className="text-white font-semibold">{user.displayName || "Stranger (Guest)"}</span>
          </div>
          <button
            onClick={logout}
            className="bg-red-600/20 text-red-400 border border-red-500/20 px-4 py-1 rounded-full hover:bg-red-600 hover:text-white transition-all text-sm"
          >
            Logout
          </button>
        </div>
      )}

      {/* Area pesan */}
      <div className="h-72 overflow-y-auto border border-gray-700 p-3 rounded-lg bg-zinc-800/50 mb-4 space-y-3 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.uid === user?.uid ? "justify-end" : "justify-start"}`}
          >
            {msg.uid !== user?.uid && (
              <img
                src={msg.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div
              className={`p-3 rounded-xl max-w-[75%] ${
                msg.uid === user?.uid
                  ? "bg-sky-500 text-black shadow-[0_0_15px_rgba(137,207,240,0.3)]"
                  : "bg-zinc-700 text-white"
              }`}
            >
              <div className="text-[10px] uppercase font-bold opacity-50 mb-1">{msg.displayName}</div>
              <div className="text-sm">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form login / kirim pesan */}
      {user ? (
        <form onSubmit={sendMessage} className="flex gap-2 w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 min-w-0 p-3 rounded-xl bg-zinc-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="bg-sky-600 px-6 rounded-xl text-white font-bold hover:bg-sky-500 transition-all active:scale-95"
          >
            Send
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition-all font-bold"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Login with Google
          </button>
          
          <div className="flex items-center gap-2 w-full opacity-30 my-1">
            <div className="flex-1 h-[1px] bg-white"></div>
            <span className="text-xs uppercase font-bold text-white">OR</span>
            <div className="flex-1 h-[1px] bg-white"></div>
          </div>

          <button
            onClick={loginAnonymously}
            className="w-full bg-zinc-800 text-white border border-gray-700 px-5 py-3 rounded-xl hover:bg-zinc-700 transition-all font-bold"
          >
            Join as Guest (Stranger)
          </button>
          
          <p className="text-xs text-gray-500 italic">No account needed to say hi!</p>
        </div>
      )}
    </div>
  );
}
