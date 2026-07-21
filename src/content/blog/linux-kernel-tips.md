---
title: "Tinkering Tips for the Linux Kernel"
date: "2026-05-29"
description: "A summary of various commands and tips for building and debugging the Linux kernel."
tags: ["linux", "kernel", "tips"]
---

Lately, I've been playing around with the Linux kernel. Writing down a few tips for future reference.

## Speed up kernel compilation

Use `CC=clang` and `LLVM=1`:

```bash
make CC=clang LLVM=1 -j$(nproc)
```

Clang builds noticeably faster than GCC, especially on multi-core systems.

## Debugging with QEMU + GDB

```bash
qemu-system-x86_64 -kernel arch/x86/boot/bzImage \
  -hda rootfs.img \
  -append "console=ttyS0" \
  -s -S -nographic
```

Connect GDB:

```gdb
target remote :1234
```

## Simple Kernel Module

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

Build it with a simple kernel Makefile and it works right out of the box.
