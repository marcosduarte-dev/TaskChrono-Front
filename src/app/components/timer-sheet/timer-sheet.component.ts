import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  TreeNode,
  TreeTableNode,
} from 'primeng/api';
import { NodeModel } from '../../models/node.model';
import {
  createNodesToTimers,
  getFormattedDateToTimerURL,
  getTextColor,
} from '../../shared/util';
import { TimerService } from '../../shared/services/timer.service';
import { TimerModel } from '../../models/timer.model';
import { SharedModule } from '../../shared/shared.module';
import { ReturnModel } from '../../models/return.model';

@Component({
  selector: 'app-timer-sheet',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './timer-sheet.component.html',
  styleUrl: './timer-sheet.component.css',
})
export class TimerSheetComponent implements OnInit {
  date: string;
  dateInput: Date;

  loaded: boolean;

  treeNode!: TreeNode[];
  treeData: NodeModel[];

  selectedNode!: any;
  selectedNodes!: any;

  constructor(
    private timerService: TimerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.date = getFormattedDateToTimerURL(new Date());
    this.treeData = [];
    this.loaded = false;
    this.dateInput = new Date();
  }

  ngOnInit(): void {
    this.getTimerByDate();
  }

  deleteSelectedTimers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected task?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedNodes.forEach((node: any) => {
          if (node.children == undefined) {
            this.timerService.deleteTimer(node.data.id).subscribe(
              (ret: ReturnModel) => {
                if (ret.status === 'Success') {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Task Deleted',
                    life: 3000,
                  });
                  this.selectedNodes = null;
                  this.getTimerByDate();
                }
              },
              (error) => {
                this.messageService.add({
                  severity: 'danger',
                  summary: 'Error',
                  detail: error.message,
                  life: 3000,
                });
              }
            );
          }
        });
      },
    });
  }

  onChangeDate() {
    console.log('onChangeDate');
    this.date = getFormattedDateToTimerURL(this.dateInput);
    this.getTimerByDate();
  }

  getTimerByDate() {
    this.timerService.getByDate(this.date).subscribe((timers: TimerModel[]) => {
      this.treeNode = createNodesToTimers(timers);
      this.loaded = true;
    });
  }

  getTextColor(backgroundColor: string): string {
    return getTextColor(backgroundColor);
  }
}
