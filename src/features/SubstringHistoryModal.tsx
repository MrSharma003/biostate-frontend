import React, { useState } from "react";
import {
  Modal,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { AppDispatch, useSelector } from "../store/store";
import { useDispatch } from "react-redux";
import { stringHistoryThunk } from "../store/substring/substringSlice";

export default function CalculationHistoryModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { historyLoding, history } = useSelector((state) => state.substring);

  const handleOpen = () => {
    setOpen(true);
    dispatch(stringHistoryThunk());
  };
  console.log(history, historyLoding);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Show History
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="history-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            borderRadius: 2,
          }}
        >
          <h2 id="history-modal-title">Calculation History</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Input</TableCell>
                  <TableCell>Longest Substring</TableCell>
                  <TableCell>Unique Substrings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((history, index) => (
                  <TableRow key={index}>
                    <TableCell>{history.input}</TableCell>
                    <TableCell>{history.longestSubstring}</TableCell>
                    <TableCell>{history.uniqueSubstrings.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}
