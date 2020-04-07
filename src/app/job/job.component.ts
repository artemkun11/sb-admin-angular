import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ThaiBaht } from 'thai-baht-text-ts';

// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
    selector: 'sb-job',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
    // tslint:disable-next-line: prettier
    constructor(private fm: FormBuilder) {}
    total = 0;
    stotal = '';
    sTaxyear = '';
    sTaxlate = '';
    sTaxstatus = '';
    sPRB = '';
    sHRT = '';
    sCarService = '';
    sbike = '';
    sOther = '';
    taxyear = 0;
    sdd = new Date();
    converter = require('number-to-words');

    frm = this.fm.group({
        inputCarNo: ['', [Validators.required]],
        inputType: ['', [Validators.required]],
        inputCarDate: ['', [Validators.required]],
        company: [''],
        carType: [''],
        txtTaxyear: [''],
        caryear: [''],
        chkTaxlate: [''],
        txtMonth: [''],
        txtTaxlate: [''],
        chkStatus: [''],
        txtTaxstatus: [''],
        chkPRB: [''],
        txtPRB: [''],
        chkHRT: [''],
        txtHRT: [''],
        chkCarService: [''],
        txtCarService: [''],
        chkBike: [''],
        txtbike: [''],
        chkOther: [''],
        txtOtherDesc: [''],
        txtOther: [''],
    });
    ngOnInit(): void {
        this.converter.toWords(13);
        console.log(this.converter.toWords(13));
    }

    cal_taxyear() {
        if (this.frm.value.caryear) {
            this.frm.value.txtTaxyear = this.frm.value.caryear;
        } else {
            this.frm.value.txtTaxyear = 0;
        }
        this.sTaxyear = this.frm.value.txtTaxyear.toLocaleString();
        this.totalPrice();
    }
    checkTaxlate() {
        if (this.frm.value.chkTaxlate) {
            if (this.frm.value.txtMonth) {
                this.frm.value.txtTaxlate = 0.01 * this.frm.value.caryear * this.frm.value.txtMonth;
            } else {
                this.frm.value.txtTaxlate = 0;
            }
        } else {
            this.frm.value.txtTaxlate = 0;
        }

        this.sTaxlate = this.frm.value.txtTaxlate.toLocaleString();
        this.totalPrice();
    }

    checkPRB() {
        if (this.frm.value.chkPRB) {
            this.frm.value.txtPRB = 200;
        } else {
            this.frm.value.txtPRB = 0;
        }

        this.sPRB = this.frm.value.txtPRB.toLocaleString();
        this.totalPrice();
    }

    checkHRT() {
        if (this.frm.value.chkHRT) {
            this.frm.value.txtHRT = 1000;
        } else {
            this.frm.value.txtHRT = 0;
        }

        this.sHRT = this.frm.value.txtHRT.toLocaleString();
        this.totalPrice();
    }

    checkCarService() {
        if (this.frm.value.chkCarService) {
            this.frm.value.txtCarService = 123;
        } else {
            this.frm.value.txtCarService = 0;
        }

        this.sCarService = this.frm.value.txtCarService.toLocaleString();
        this.totalPrice();
    }

    checkBike() {
        if (this.frm.value.chkBike) {
            this.frm.value.txtbike = 650;
        } else {
            this.frm.value.txtbike = 0;
        }

        this.sbike = this.frm.value.txtbike.toLocaleString();
        this.totalPrice();
    }

    checkOther() {
        if (!this.frm.value.chkOther) {
            this.frm.value.txtOther = 0;
        } else {
            if (this.frm.value.txtOther) {
                this.frm.value.txtOther = 0;
            }
        }
        this.sOther = this.frm.value.txtOther.toLocaleString();
        this.totalPrice();
    }

    checkStatus() {
        if (this.frm.value.chkStatus) {
            this.frm.value.txtTaxstatus = 100;
        } else {
            this.frm.value.txtTaxstatus = 0;
        }

        this.sTaxstatus = this.frm.value.txtTaxstatus.toLocaleString();
        this.totalPrice();
    }

    totalPrice() {
        this.total =
            +this.frm.value.txtTaxyear +
            +this.frm.value.txtTaxlate +
            +this.frm.value.txtTaxstatus +
            +this.frm.value.txtPRB +
            +this.frm.value.txtHRT +
            +this.frm.value.txtCarService +
            +this.frm.value.txtbike +
            +this.frm.value.txtOther;

        this.stotal = this.total.toLocaleString();
    }
    transform(value: Date): string {
        const monthNames = [
            'ม.ค.',
            'ก.พ.',
            'มี.ค.',
            'เม.ย.',
            'พ.ค.',
            'มิ.ย.',
            'ก.ค.',
            'ส.ค.',
            'ก.ย.',
            'ต.ค.',
            'พ.ย.',
            'ธ.ค.',
        ];
        const currentdate = new Date(value);
        return `${currentdate.getDate()} ${
            monthNames[currentdate.getMonth()]
        } ${currentdate.getFullYear() + 543}`;
    }
    timeform(value: Date): string {
        const currentdate = new Date(value);
        return `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    }
    makePdf() {
        this.cal_taxyear();
        this.checkBike();
        this.checkCarService();
        this.checkHRT();
        this.checkOther();
        this.checkPRB();
        this.checkStatus();
        this.checkTaxlate();

        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.fonts = {
            THSarabunNew: {
                normal: 'THSarabunNew.ttf',
                bold: 'THSarabunNewBold.ttf',
                italics: 'THSarabunNewItalic.ttf',
                bolditalics: 'THSarabunNewBoldItalic.ttf',
            },
        };
        const money = 10050;
        const dd = {
            header: {},
            footer: {},
            pageOrientation: 'landscape',
            pageMargins: [1, 0, 0, 0],
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        // headerRows: 1,
                        widths: ['25%', '25%', '25%', '*'],

                        body: [
                            [
                                {
                                    text: ' วันที่ ' + this.transform(this.sdd),
                                    color: 'white',
                                    fillColor: 'green',
                                    fontSize: 9,
                                },
                                {
                                    text: ' ใบเสร็จรับเงิน/ต้นฉบับ[สำหรับลูกค้า]',
                                    color: 'white',
                                    fillColor: 'green',
                                    alignment: 'right',
                                    fontSize: 9,
                                },
                                {
                                    text: ' วันที่ ' + this.transform(this.sdd),
                                    color: 'white',
                                    fillColor: 'blue',
                                    fontSize: 9,
                                },
                                {
                                    text: ' ใบเสร็จรับเงิน/ต้นฉบับ[สำหรับลูกค้า]',
                                    color: 'white',
                                    fillColor: 'blue',
                                    alignment: 'right',
                                    fontSize: 9,
                                },
                            ],
                        ],
                    },
                },
                {
                    layout: 'noBorders',
                    table: {
                        // headerRows: 1,
                        widths: ['30%', '20%', '30%', '*'],
                        body: [
                            [
                                {
                                    text:
                                        ' ตรอ ก้าวหน้า1 \n ที่อยู่ 38 ถนนพหลโยธิน ตำบลเกาะแก้ว อำเภอเมือง ภูเก็ต \n โทรศัพท์ 0814897312',
                                },
                                { text: '' },
                                {
                                    text:
                                        ' ตรอ ก้าวหน้า1 \n ที่อยู่ 38 ถนนพหลโยธิน ตำบลเกาะแก้ว อำเภอเมือง ภูเก็ต \n โทรศัพท์ 0814897312',
                                },
                                { text: '' },
                            ],
                            [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
                            [
                                { text: ' ชื่อลูกค้า\n ที่อยู่ \n โทรศัพท์' },
                                {
                                    text:
                                        'เลขที่ 630100037\nวันที่ ' +
                                        this.transform(this.sdd) +
                                        '\nเวลา ' +
                                        this.timeform(this.sdd),
                                },
                                { text: ' ชื่อลูกค้า\n ที่อยู่ \n โทรศัพท์' },
                                {
                                    text:
                                        'เลขที่ 630100037\nวันที่ ' +
                                        this.transform(this.sdd) +
                                        '\nเวลา ' +
                                        this.timeform(this.sdd),
                                },
                            ],
                            [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
                            [
                                { text: ' ทะเบียนรถ ' + this.frm.value.inputCarNo },
                                { text: '' },
                                { text: ' ทะเบียนรถ ' + this.frm.value.inputCarNo },
                                { text: '' },
                            ],
                        ],
                    },
                },
                {
                    layout: 'noBorders',
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['5%', '*', '13%'],
                                        body: [
                                            [
                                                { text: 'ลำดับ', alignment: 'center' },
                                                { text: 'รายการ', alignment: 'center' },
                                                { text: 'จำนวนเงิน', alignment: 'center' },
                                            ],
                                            [
                                                {
                                                    text: '1\n2\n3\n4\n5\n6\n7\n8',
                                                    alignment: 'center',
                                                },
                                                {
                                                    text:
                                                        'ภาษีรถประจำปี\n' +
                                                        'ค่าปรับล่าช้า\n' +
                                                        'ค่าตรวจสภาพรถ\n' +
                                                        'ค่าเบี้ยประกัน พรบ\n' +
                                                        'ค่าเบี้ยประกัน ภาคสมัครใจ\n' +
                                                        'ค่าบริการเสียภาษี รถ\n' +
                                                        'ค่าบริการออก พรบ. จยย.\n' +
                                                        this.frm.value.txtOtherDesc,
                                                },
                                                {
                                                    text:
                                                        this.frm.value.txtTaxyear.toLocaleString() +
                                                        '\n' +
                                                        this.sTaxlate +
                                                        '\n' +
                                                        this.sTaxstatus +
                                                        '\n' +
                                                        this.sPRB +
                                                        '\n' +
                                                        this.sHRT +
                                                        '\n' +
                                                        this.sCarService +
                                                        '\n' +
                                                        this.sbike +
                                                        '\n' +
                                                        this.sOther,
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    layout: 'noBorders',
                                                    table: {
                                                        widths: ['*', '13%'],
                                                        body: [
                                                            [
                                                                {
                                                                    text:
                                                                        '\n\n' +
                                                                        this.converter.toWords(
                                                                            this.total
                                                                        ),
                                                                },
                                                                {
                                                                    text:
                                                                        'ยอดรวม\nส่วนลด\nยอดสุทธิ',
                                                                    alignment: 'right',
                                                                },
                                                            ],
                                                        ],
                                                    },
                                                    colSpan: 2,
                                                },
                                                {},
                                                {
                                                    text: this.stotal + '\n' + '0\n' + this.stotal,
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    layout: 'noBorders',
                                                    table: {
                                                        widths: ['*', '13%'],
                                                        body: [
                                                            [
                                                                {
                                                                    text: 'การชำระเงิน\n\n',
                                                                    bold: true,
                                                                },
                                                                {
                                                                    text:
                                                                        'เงินสด\nเงินโอน\nเงินค้างชำระ',
                                                                    alignment: 'right',
                                                                },
                                                            ],
                                                        ],
                                                    },
                                                    colSpan: 2,
                                                },
                                                {},
                                                {
                                                    text: this.stotal + '\n' + '0\n' + '0\n',
                                                    alignment: 'right',
                                                },
                                            ],
                                        ],
                                    },
                                },
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['5%', '*', '13%'],
                                        body: [
                                            [
                                                { text: 'ลำดับ', alignment: 'center' },
                                                { text: 'รายการ', alignment: 'center' },
                                                { text: 'จำนวนเงิน', alignment: 'center' },
                                            ],
                                            [
                                                {
                                                    text: '1\n2\n3\n4\n5\n6\n7\n8',
                                                    alignment: 'center',
                                                },
                                                {
                                                    text:
                                                        'ภาษีรถประจำปี\n' +
                                                        'ค่าปรับล่าช้า\n' +
                                                        'ค่าตรวจสภาพรถ\n' +
                                                        'ค่าเบี้ยประกัน พรบ\n' +
                                                        'ค่าเบี้ยประกัน ภาคสมัครใจ\n' +
                                                        'ค่าบริการเสียภาษี รถ\n' +
                                                        'ค่าบริการออก พรบ. จยย.\n' +
                                                        this.frm.value.txtOtherDesc,
                                                },
                                                {
                                                    text:
                                                        this.sTaxyear +
                                                        '\n' +
                                                        this.sTaxlate +
                                                        '\n' +
                                                        this.sTaxstatus +
                                                        '\n' +
                                                        this.sPRB +
                                                        '\n' +
                                                        this.sHRT +
                                                        '\n' +
                                                        this.sCarService +
                                                        '\n' +
                                                        this.sbike +
                                                        '\n' +
                                                        this.sOther,
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    layout: 'noBorders',
                                                    table: {
                                                        widths: ['*', '13%'],
                                                        body: [
                                                            [
                                                                {
                                                                    text:
                                                                        '\n\n' +
                                                                        this.converter.toWords(
                                                                            this.total
                                                                        ),
                                                                },
                                                                {
                                                                    text:
                                                                        'ยอดรวม\nส่วนลด\nยอดสุทธิ',
                                                                    alignment: 'right',
                                                                },
                                                            ],
                                                        ],
                                                    },
                                                    colSpan: 2,
                                                },
                                                {},
                                                {
                                                    text: this.stotal + '\n' + '0\n' + this.stotal,
                                                    alignment: 'right',
                                                },
                                            ],
                                            [
                                                {
                                                    layout: 'noBorders',
                                                    table: {
                                                        widths: ['*', '13%'],
                                                        body: [
                                                            {
                                                                text: 'การชำระเงิน\n\n',
                                                                bold: true,
                                                            },
                                                            {
                                                                text:
                                                                    'เงินสด\nเงินโอน\nเงินค้างชำระ',
                                                                alignment: 'right',
                                                            },
                                                        ],
                                                    },
                                                    colSpan: 2,
                                                },
                                                {},
                                                {
                                                    text: this.stotal + '\n' + '0\n' + '0\n',
                                                    alignment: 'right',
                                                },
                                            ],
                                        ],
                                    },
                                },
                            ],
                            [
                                {
                                    layout: 'noBorders',
                                    table: {
                                        widths: ['*', '25%'],
                                        body: [
                                            [
                                                {},
                                                {
                                                    text:
                                                        '........................................',
                                                    alignment: 'center',
                                                },
                                            ],
                                            [{}, { text: 'ผู้รับเงิน', alignment: 'center' }],
                                        ],
                                    },
                                },
                                {
                                    layout: 'noBorders',
                                    table: {
                                        widths: ['*', '25%'],
                                        body: [
                                            [
                                                {},
                                                {
                                                    text:
                                                        '........................................',
                                                    alignment: 'center',
                                                },
                                            ],
                                            [{}, { text: 'ผู้รับเงิน', alignment: 'center' }],
                                        ],
                                    },
                                },
                            ],
                        ],
                    },
                },
            ],
            defaultStyle: {
                font: 'THSarabunNew',
            },
        };
        pdfMake.createPdf(dd).open();
    }
}
