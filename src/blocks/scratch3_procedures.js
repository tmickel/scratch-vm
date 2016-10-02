function Scratch3ProcedureBlocks(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;
}

Scratch3ProcedureBlocks.prototype.RETURN = null;
Scratch3ProcedureBlocks.prototype.RETURN2 = null;

/**
 * Retrieve the block primitives implemented by this package.
 * @return {Object.<string, Function>} Mapping of opcode to Function.
 */
Scratch3ProcedureBlocks.prototype.getPrimitives = function() {
    return {
        'procedures_defnoreturn': this.defNoReturn,
        'procedures_callnoreturn': this.callNoReturn,
        'procedures_defreturn': this.defReturn,
        'procedures_callreturn': this.callReturn,
        'procedures_report': this.report
    };
};

Scratch3ProcedureBlocks.prototype.defNoReturn = function () {
    // No-op: execute the blocks.
};

Scratch3ProcedureBlocks.prototype.callNoReturn = function (args, util) {
    if (!util.stackFrame.executed) {
        var procedureName = args.mutation.name;
        util.stackFrame.executed = true;
        util.startProcedure(procedureName);
    }
};

Scratch3ProcedureBlocks.prototype.defReturn = function (args) {
    // No-op: execute the blocks.
    this.RETURN = args.RETURN;
    return;
};

Scratch3ProcedureBlocks.prototype.callReturn = function (args, util) {
    this.RETURN2 = null;
    if (!util.stackFrame.executed) {
        var procedureName = args.mutation.name;
        util.stackFrame.executed = true;
        util.startProcedure(procedureName);
    }
    if (this.RETURN2) {
        this.RETURN = this.RETURN2;
        this.RETURN2 = null;
    }
    return this.RETURN;
};

Scratch3ProcedureBlocks.prototype.report = function (args) {
    this.RETURN2 = args.VALUE;
};

module.exports = Scratch3ProcedureBlocks;
