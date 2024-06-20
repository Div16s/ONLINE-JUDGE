#!/bin/bash

# Define input and output files
input_file="input.txt"
output_file="output.txt"
error_file="/app/error.txt"

# Run the Python code with the input file and redirect the output to output.txt and errors to error.txt
python code.py < "$input_file" > "$output_file" 2> "$error_file"

# Check if there were any errors
if [ -s "$error_file" ]; then
  echo "Error:"
  cat "$error_file"
else
  echo "Output:"
  cat "$output_file"
fi
