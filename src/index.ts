import * as readline from "readline";
import { ReminderDatabase } from "./reminder";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const reminderDB = new ReminderDatabase();

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  while (true) {
    console.log("\n1. Create Reminder");
    console.log("2. View All Reminders");
    console.log("3. Mark Reminder as Completed");
    console.log("4. Unmark Reminder as Completed");
    console.log("5. Update Reminder");
    console.log("6. Remove Reminder");
    console.log("7. Exit");

    const choice = await askQuestion("Select an option: ");

    switch (choice) {
      case "1":
        const id = await askQuestion("Enter Reminder ID: ");
        const title = await askQuestion("Enter Reminder Title: ");
        const date = await askQuestion("Enter Due Date (YYYY-MM-DD): ");
        reminderDB.createReminder(id, title, date);
        console.log("Reminder added successfully!");
        break;

      case "2":
        console.log("All Reminders:", reminderDB.getAllReminders());
        break;

      case "3":
        const markId = await askQuestion("Enter Reminder ID to mark as completed: ");
        reminderDB.markReminderAsCompleted(markId);
        console.log("Reminder marked as completed!");
        break;

      case "4":
        const unmarkId = await askQuestion("Enter Reminder ID to unmark as completed: ");
        reminderDB.unmarkReminderAsCompleted(unmarkId);
        console.log("Reminder unmarked as completed!");
        break;

      case "5":
        const updateId = await askQuestion("Enter Reminder ID to update: ");
        const newTitle = await askQuestion("Enter New Title: ");
        const newDate = await askQuestion("Enter New Due Date (YYYY-MM-DD): ");
        reminderDB.updateReminder(updateId, newTitle, newDate);
        console.log("Reminder updated successfully!");
        break;

      case "6":
        const removeId = await askQuestion("Enter Reminder ID to delete: ");
        reminderDB.removeReminder(removeId);
        console.log("Reminder deleted!");
        break;

      case "7":
        console.log("Exiting...");
        rl.close();
        return;

      default:
        console.log("Invalid option. Please try again.");
    }
  }
}

main();