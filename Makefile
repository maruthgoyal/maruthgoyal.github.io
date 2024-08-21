#
# Author: Jake Zimmerman <jake@zimmerman.io>
#
# ===== Usage ================================================================
#
# make                  Prepare docs/ folder (all markdown & assets)
# make docs/index.html  Recompile just docs/index.html
#
# make watch            Start a local HTTP server and rebuild on changes
# PORT=4242 make watch  Like above, but use port 4242
#
# make clean            Delete all generated files
#
# ============================================================================

SOURCES := $(shell find blogmd -type f -name '*.md')
TARGETS := $(patsubst blogmd/%.md,blogs/%.html,$(SOURCES))

.PHONY: all
all: $(TARGETS)
	python3 bgen.py

.PHONY: clean
clean:
	rm -rf blogs

# Generalized rule: how to build a .html file from each .md
# Note: you will need pandoc 2 or greater for this to work
blogs/%.html: blogmd/%.md template.html5 Makefile tools/build.sh
	tools/build.sh "$<" "$@"


