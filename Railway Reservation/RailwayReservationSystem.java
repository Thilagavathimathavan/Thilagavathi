import java.util.*;
import java.time.LocalDate;

class Train {
    int trainNo;
    String trainName;
    String source;
    String destination;
    int totalSeats;
    int availableSeats;
    double fare;

    Train(int trainNo, String trainName, String source, String destination, int totalSeats, double fare) {
        this.trainNo = trainNo;
        this.trainName = trainName;
        this.source = source;
        this.destination = destination;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats;
        this.fare = fare;
    }

    @Override
    public String toString() {
        return String.format("%d - %s (%s ➜ %s), Seats Available: %d, Fare: ₹%.2f",
                trainNo, trainName, source, destination, availableSeats, fare);
    }
}

class Passenger {
    String name;
    int age;
    String gender;

    Passenger(String name, int age, String gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    @Override
    public String toString() {
        return name + " (" + gender + ", " + age + " yrs)";
    }
}

class Ticket {
    static int ticketCounter = 5000;
    int ticketId;
    Train train;
    LocalDate journeyDate;
    List<Passenger> passengers = new ArrayList<>();

    Ticket(Train train, LocalDate journeyDate) {
        this.ticketId = ++ticketCounter;
        this.train = train;
        this.journeyDate = journeyDate;
    }

    void addPassenger(Passenger p) {
        passengers.add(p);
    }

    double calculateTotalFare() {
        return passengers.size() * train.fare;
    }

    @Override
    public String toString() {
        return "\nTicket ID: " + ticketId +
                "\nTrain: " + train.trainName + " (" + train.source + " ➜ " + train.destination + ")" +
                "\nJourney Date: " + journeyDate +
                "\nPassengers: " + passengers +
                "\nTotal Fare: ₹" + calculateTotalFare();
    }
}

public class RailwayReservationSystem {
    private static final Scanner sc = new Scanner(System.in);
    private static final Map<Integer, Train> trains = new HashMap<>();
    private static final List<Ticket> tickets = new ArrayList<>();

    public static void main(String[] args) {
        // Predefined trains
        trains.put(201, new Train(201, "Chennai Express", "Chennai", "Delhi", 10, 1200));
        trains.put(202, new Train(202, "Rockfort Express", "Trichy", "Chennai", 8, 400));
        trains.put(203, new Train(203, "Pandian Express", "Madurai", "Chennai", 6, 500));

        while (true) {
            System.out.println("\n=== Railway Reservation System ===");
            System.out.println("1. View Trains");
            System.out.println("2. Book Ticket");
            System.out.println("3. View Tickets");
            System.out.println("4. Cancel Ticket");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1 -> viewTrains();
                case 2 -> bookTicket();
                case 3 -> viewTickets();
                case 4 -> cancelTicket();
                case 5 -> {
                    System.out.println("Thank you for using the Railway Reservation System!");
                    return;
                }
                default -> System.out.println("Invalid choice! Try again.");
            }
        }
    }

    private static void viewTrains() {
        System.out.println("\nAvailable Trains:");
        for (Train t : trains.values()) {
            System.out.println(t);
        }
    }

    private static void bookTicket() {
        System.out.print("Enter Train Number: ");
        int trainNo = sc.nextInt();
        sc.nextLine();

        Train train = trains.get(trainNo);
        if (train == null) {
            System.out.println("❌ Train not found!");
            return;
        }

        if (train.availableSeats == 0) {
            System.out.println("❌ No seats available!");
            return;
        }

        System.out.print("Enter Journey Date (YYYY-MM-DD): ");
        String dateStr = sc.nextLine();
        LocalDate journeyDate = LocalDate.parse(dateStr);

        System.out.print("How many passengers? ");
        int count = sc.nextInt();
        sc.nextLine();

        if (count > train.availableSeats) {
            System.out.println("❌ Only " + train.availableSeats + " seats available!");
            return;
        }

        Ticket ticket = new Ticket(train, journeyDate);

        for (int i = 1; i <= count; i++) {
            System.out.println("Enter details for Passenger " + i);
            System.out.print("Name: ");
            String name = sc.nextLine();
            System.out.print("Age: ");
            int age = sc.nextInt();
            sc.nextLine();
            System.out.print("Gender (M/F): ");
            String gender = sc.nextLine();

            ticket.addPassenger(new Passenger(name, age, gender));
        }

        train.availableSeats -= count;
        tickets.add(ticket);

        System.out.println("✅ Ticket Booked Successfully!");
        System.out.println(ticket);
    }

    private static void viewTickets() {
        if (tickets.isEmpty()) {
            System.out.println("No tickets booked yet.");
            return;
        }
        for (Ticket t : tickets) {
            System.out.println(t);
        }
    }

    private static void cancelTicket() {
        System.out.print("Enter Ticket ID to cancel: ");
        int id = sc.nextInt();
        sc.nextLine();

        Ticket toCancel = null;
        for (Ticket t : tickets) {
            if (t.ticketId == id) {
                toCancel = t;
                break;
            }
        }

        if (toCancel != null) {
            tickets.remove(toCancel);
            toCancel.train.availableSeats += toCancel.passengers.size();
            System.out.println("❌ Ticket cancelled successfully for Ticket ID " + id);
        } else {
            System.out.println("Ticket not found!");
        }
    }
}
