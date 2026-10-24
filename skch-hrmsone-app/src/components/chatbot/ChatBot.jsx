import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Fab,
  Fade,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";

import { RiRobot3Fill } from "react-icons/ri";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "../typography/Typography";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Hi there! 👋",
    time: "Welcome",
  },
  {
    id: 2,
    sender: "bot",
    text: "I'm your virtual assistant. How can I help you today?",
    time: "Welcome",
  },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, open]);

  const handleSend = () => {
    const text = input.trim();

    if (!text) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Demo response only.
    // Replace this with your chatbot API call.
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: `Thanks for your message! You said: "${text}". Connect me to your backend to get intelligent answers.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Chat popup */}
      <Fade in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={12}
          role="dialog"
          aria-label="Chat assistant"
          sx={{
            position: "fixed",
            right: { xs: 12, sm: 24 },
            bottom: { xs: 84, sm: 100 },
            width: {
              xs: "calc(100vw - 24px)",
              sm: 380,
            },
            height: {
              xs: "min(520px, calc(100dvh - 110px))",
              sm: 520,
            },
            maxHeight: "calc(100dvh - 100px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 4,
            zIndex: 1300,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.75,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #1BADBB 0%, #087E8B 100%)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#FFFFFF",
                width: 42,
                height: 42,
              }}
            >
              <RiRobot3Fill size={25} />
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={700} fontSize={16}>
                AI Assistant
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "#86EFAC",
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.85)" }}
                >
                  Ready to help
                </Typography>
              </Box>
            </Box>

            <IconButton
              onClick={handleToggle}
              aria-label="Close chat"
              sx={{
                color: "#FFFFFF",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            aria-live="polite"
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#F7F9FC",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Today
            </Typography>

            {messages.map((message) => {
              const isUser = message.sender === "user";

              return (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {!isUser && (
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "#DDF6F7",
                        color: "#087E8B",
                      }}
                    >
                      <RiRobot3Fill size={17} />
                    </Avatar>
                  )}

                  <Box
                    sx={{
                      maxWidth: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isUser ? "flex-end" : "flex-start",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        px: 1.75,
                        py: 1.25,
                        bgcolor: isUser ? "#087E8B" : "#FFFFFF",
                        color: isUser ? "#FFFFFF" : "text.primary",
                        borderRadius: isUser
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                        overflowWrap: "anywhere",
                        border: isUser ? "none" : "1px solid #E8EDF2",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>

                    <Typography
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        color: "text.secondary",
                        fontSize: 10,
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            <div ref={messagesEndRef} />
          </Box>

          {/* Message input */}
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1.5,
              bgcolor: "#FFFFFF",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <TextField
              inputRef={inputRef}
              fullWidth
              size="small"
              placeholder="Type your message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              inputProps={{
                "aria-label": "Type your message",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#F7F9FC",
                  fontSize: 14,
                  "& fieldset": {
                    borderColor: "#E5EAF0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1BADBB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1BADBB",
                  },
                },
              }}
            />

            <IconButton
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              sx={{
                width: 42,
                height: 42,
                flexShrink: 0,
                bgcolor: "#087E8B",
                color: "#FFFFFF",
                "&:hover": {
                  bgcolor: "#066873",
                },
                "&.Mui-disabled": {
                  bgcolor: "#E5E7EB",
                  color: "#9CA3AF",
                },
              }}
            >
              <SendRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Fade>

      {/* Floating chatbot icon */}
      <Fab
        onClick={handleToggle}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        aria-expanded={open}
        color="primary"
        sx={{
          position: "fixed",
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          width: 60,
          height: 60,
          color: "#FFFFFF",
          background: "linear-gradient(135deg, #1BADBB 0%, #087E8B 100%)",
          boxShadow: "0 8px 24px rgba(8,126,139,0.35)",
          zIndex: 1301,
          transition: "transform 200ms ease, box-shadow 200ms ease",
          "&:hover": {
            bgcolor: "#087E8B",
            transform: "translateY(-3px)",
            boxShadow: "0 12px 28px rgba(8,126,139,0.4)",
          },
        }}
      >
        {open ? (
          <CloseRoundedIcon sx={{ fontSize: 28 }} />
        ) : (
          <RiRobot3Fill size={29} />
        )}
      </Fab>
    </>
  );
};

export default ChatBot;
