import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  showMoreStates: boolean[] = [];

  projects = [
    { 
      name: "F1-Core",
      image: "public/images/e-com.png",
      shortDesc: "<a href='https://f1-core.azurewebsites.net/' class='text-blue-500 hover:underline' target='_blank'>F1-Core</a> is an E-Commerce website used for selling the products.",
      longDesc: "F1-Core is created using .Net Core, Angular. It has all the basic features of an E-commerce website like user registration, login, product listing, product details, cart functionality, payment gateway integration, order history, and user profile management. For the purpose of payment integration , Stripe payment gateway is used. It also includes Admin Panel which is used to manage all the products, orders, users etc."
    },
    { 
      name: "Point of Sale System",
      image: "public/images/POS.png",
      shortDesc: "Point of sale system is a web application that would make it easier for making the sales, managing the stock, providing better service to the customers.",
      longDesc: "The web application enables the user to create and add products according to the categories, keeping the track on the stock, making a purchase order according, make sales, analyze the sales and keep the offers accordingly to attract the customers. The web application was created using .Net Core Web API + Angular. RazorPay was used a payment gateway integration."
    },
    { 
      name: "Expense Tracker",
      image: "public/images/expensetracker.png",
      shortDesc: "<a href='https://github.com/rashmi3112/ExpenseTracker-Web-api-mvc' class='text-blue-500 hover:underline' target='_blank'>Expense tracker</a> is a personal expense management web application created using asp.net mvc architecture and api.",
      longDesc: "This web application enables the user to add the category, daily expenses and set limit for those expenses."
    },
    { 
      name: "Employee Leave Management",
      image: "public/images/emp_leave_mnagement_system.png",
      shortDesc: "Employee Leave Management System is a web application that enables the user to manage the employee leave",
      longDesc: "The a web application that enables the employee to apply for leave, and the manager to approve or reject the leave. The web application was created using Php. The application is developed using the MVC architecture."
    },
    { 
      name: "Attendance and Payroll System",
      image: "public/images/attendance_mangment.png",
      shortDesc: "Employee Attendance and Payroll Management System is a web application that enables the user to manage the employee attendance and payroll.",
      longDesc: "Employee Attendance and Payroll Management System is a web application that enables the employee to mark their attendance and accordingly the salary is calculated based on the basic and other salary components according to one's job role. The web application is created using Php."
    },
    { 
      name: "Restaurant page",
      image: "public/images/restraunt.png",
      shortDesc: "The Spice Affair is a restaurant page",
      longDesc: "The Spice Affair is a restaurant page which gives the glimpse of the restaurant and its menu and one can book a table as well. It also has facility for joining their newsletter. The web application is created using Html, Css and JavaScript with backend using .Net MVC."
    },
    { 
      name: "Portfolio Website",
      image: "public/images/portfolio.png",
      shortDesc: "It is a portfolio website.",
      longDesc: "The Portfolio website is a website that showcases the services provided by the astrologer. It is created using .Net Core, Angular."
    },
  ]

  constructor() {
    this.showMoreStates = new Array(this.projects.length).fill(false);    
  }

  toggleReadMore(index: number){
    this.showMoreStates[index] = !this.showMoreStates[index];
  }
}
