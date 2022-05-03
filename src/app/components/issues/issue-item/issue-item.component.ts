import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from 'src/app/models/issues.model';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit {

  @Input() issue_item: Issue;
  @Input() index: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onIssueSelected() {
    this.router.navigate([this.issue_item.iid, 'issue_details',]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
