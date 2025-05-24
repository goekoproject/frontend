import { spawn } from 'child_process'

// Define the commands to execute
const command1 = 'nx serve goeko' // Command to start Angular server
const command2 = 'bun run start-tailwind' // Command to start Tailwind with npm

// Function to execute commands with custom colors
function runCommand(command, color) {
  const process = spawn(command, { shell: true })

  // Color the output based on the passed color
  process.stdout.on('data', (data) => {
    console.log(`\x1b[${color}m${data.toString()}\x1b[0m`)
  })

  process.stderr.on('data', (data) => {
    console.error(`\x1b[${color}m${data.toString()}\x1b[0m`)
  })

  process.on('close', (code) => {
    if (code !== 0) {
      console.log(`Command ended with code ${code}`)
    }
  })
}

// Execute both commands in parallel with colors
runCommand(command1, '34') // Blue for goeko
runCommand(command2, '32') // Green for tailwind
