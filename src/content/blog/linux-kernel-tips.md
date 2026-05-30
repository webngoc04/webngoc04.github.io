---
title: "Mẹo nhỏ khi vọc Linux Kernel"
date: "2026-05-29"
description: "Tổng hợp vài mẹo và command khi build và debug kernel Linux."
tags: ["linux", "kernel", "tips"]
---

Dạo gần đây mình hay vọc kernel Linux, ghi lại vài mẹo nhỏ để sau này còn nhớ.

## Build kernel nhanh hơn

Dùng `CC=clang` và `LLVM=1`:

```bash
make CC=clang LLVM=1 -j$(nproc)
```

Clang build nhanh hơn GCC đáng kể, nhất là trên máy multi-core.

## Debug với QEMU + GDB

```bash
qemu-system-x86_64 -kernel arch/x86/boot/bzImage \
  -hda rootfs.img \
  -append "console=ttyS0" \
  -s -S -nographic
```

Kết nối GDB:

```gdb
target remote :1234
```

## Kernel module đơn giản

```c
#include <linux/module.h>
#include <linux/kernel.h>

int init_module(void) {
  printk(KERN_INFO "Hello from module!\n");
  return 0;
}

void cleanup_module(void) {
  printk(KERN_INFO "Goodbye!\n");
}

MODULE_LICENSE("GPL");
```

Build với Makefile kernel có sẵn là chạy được ngay.
